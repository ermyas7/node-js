var socket = io();

socket.on('connect', function(message) {
  console.log('Server connected!');
})

socket.on('newMessage', function(message) {
  var li = jQuery(`<li></li>`);
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
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
    jQuery('[name=message]').val('');
  })
})


var locationBtn = jQuery('#send-location');

locationBtn.on('click', function(el){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser!');
  }

  locationBtn.attr('disabled', 'disabled').text('Sharing location ...');
  navigator.geolocation.getCurrentPosition(function(position) {
    locationBtn.removeAttr('disabled').text('Share location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
console.log(position)
}, function(){
    alert('unable to fetch location');
    locationBtn.removeAttr('disabled').text('Share location');
  })
})

socket.on('newLocationMessage', function(message){

  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);

})
