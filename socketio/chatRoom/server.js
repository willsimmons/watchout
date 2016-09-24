'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('someone connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (message) => {
    console.log('message ' + message);
    io.emit('chat message', message);
  });
});



http.listen(3000, () => {
  console.log('listening on 3000');
});
