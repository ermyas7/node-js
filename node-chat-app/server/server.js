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

socket.emit('newMessage', {
  from: 'Micheal',
  text: 'I am coming wait!',
  createdAt: 1254
})

  socket.on('createMessage', (message) => {
    console.log('message:', message);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected!');
  })
})

app.get('/', (req, res) => {
  res.render('index.html');
})

server.listen(3000, () => console.log('server running on port 3000!'));
