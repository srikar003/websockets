const express = require('express');
const socket = require('socket.io');
//app setup
const app = express();
const server = app.listen('4000', () => {
    console.log('server listening at port 4000');
});

//static files
app.use(express.static('public'));

//socket setup
const IO = socket(server);

IO.on('connection', (socInstance) => {
    console.log('connection made successfully', socInstance.id);

    socInstance.on('chat', (data) => {
        IO.sockets.emit('chatInput', data);
    });

    socInstance.on('typing', (data) => {
        socInstance.broadcast.emit('typer', data);
    })
});