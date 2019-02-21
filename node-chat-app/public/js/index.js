var socket = io();

socket.on('connect', function(){
  console.log('New user connected!');
})

socket.emit('createMessage', {
  to: 'Abeni@example.com',
  text: 'hey! can you meet me in the bar now'
})

socket.on('newMessage', function(message){
  console.log('message: ', message);
})

socket.on('disconnect', function(){
  console.log('User disconnected!');
})
