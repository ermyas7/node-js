var socket = io();

socket.on('connect', function(message){
  console.log('Server connected!');
})

socket.on('newMessage', function(message){
  console.log('message: ', message);
})

socket.on('disconnect', function(){
  console.log('User disconnected!');
})
