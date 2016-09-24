'use strict';

let socket = io();

$('form').submit((e) => {
  e.preventDefault();
  socket.emit('chat message', $('#m').val());
  return false;
});

socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg));
});
