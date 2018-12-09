//Set Connection to Server

const socket = io.connect('http://localhost:4000');

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const sendbtn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

//emit Events
sendbtn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
    message.value = '';
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
})

//listen for events
socket.on('chatInput', (msg) => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + msg.handle + ':</strong>' + msg.message + '</p>';
})

socket.on('typer', (typerName) => {
    feedback.innerHTML = '<p><em>' + typerName + ' is typing a message</p></em>';
})