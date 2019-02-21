const path      = require('path');
const express   = require('express');
const http      = require('http');
const socketIO  = require('socket.io');

const app = express();

var publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'new user joined!',
    createdAt: new Date().getTime()
  })
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'welcome to the chat app!',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {

    console.log('message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })

    // socket.broadcast.emmit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected!');
  })
})

app.get('/', (req, res) => {
  res.render('index.html');
})

server.listen(3000, () => console.log('server running on port 3000!'));
