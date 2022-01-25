const socket = io('https://chattapp.prokillshri.repl.co', {
    withCredentials: true,
});

const form = document.getElementById('sendContainer');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('ting.mp3')

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right'); // append message to the right
    socket.emit('send', message); // send message to the serverm
    messageInp.value = '';
})

const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined joined the chat` , 'right');
})

socket.on('recieve', data => {
    append(`${data.name} : ${data.message}` , 'left');
})

socket.on('user-left', name => {
    append(`${name} left the chat `, 'left');
})