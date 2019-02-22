var socket = io();

socket.on('connect', function(message) {
  console.log('Server connected!');
})

socket.on('newMessage', function(message) {
  var li = jQuery(`<li></li>`);
  li.text(`${message.from}: ${message.text}`);
  jQuery('.messages').append(li);
})

socket.on('disconnect', function() {
  console.log('User disconnected!');
})


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'user',
    text: jQuery('[name=message]').val()
  }, function() {

  })
})
