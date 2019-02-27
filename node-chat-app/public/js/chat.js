var socket = io();

var scrollToBottom = function(){
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lasMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lasMessageHeight > scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function(message) {
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href= '/';
    }else{
      console.log('no error');
    }
  })
})

socket.on('updateUserList', function(users){
  var ul = jQuery('<ul></ul>');
  users.forEach((user) => {
    ul.append(jQuery('<li></li>').text(user));

  })
  jQuery('#users').html(ul);
})

socket.on('newMessage', function(message) {
  scrollToBottom();
  var template = jQuery('#message-template').html();
  var formatedDate = moment(message.createdAt).format('h:mm a');
  var html  = Mustache.render(template, {
    from: message.from,
    createdAt: formatedDate,
    text: message.text
  });
  jQuery('#messages').append(html);
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
}, function(){
    alert('unable to fetch location');
    locationBtn.removeAttr('disabled').text('Share location');
  })
})

socket.on('newLocationMessage', function(message){
  scrollToBottom();
  var template = jQuery('#location-message-template').html();
  var formatedDate = moment(message.createdAt).format('h:mm a');
  var html  = Mustache.render(template, {
    from: message.from,
    createdAt: formatedDate,
    url: message.url
  });
  jQuery('#messages').append(html);
})
