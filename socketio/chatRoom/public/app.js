'use strict';

let socket = io();
console.log('this is the one we want');
$('form').submit((e) => {
  e.preventDefault();
  socket.emit('chat message', $('#m').val());
  return false;
});

socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg));
});
