const socket = io('http://localhost:8000');

//get DOM element
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer =document.querySelector('.container');

//play audion when reciving a message
let audio= new Audio('tingtong.mp3');

//function which will append event info to the container
const append= (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

//ask new user for his name
const name=prompt("enter your name");
socket.emit('new-user-joined',name);

//if the new user join recive his name form the server
socket.on('user-joined',name =>{
    append(`${name}: Joined the chat`,'right');
})

//if the server send the message recive it
socket.on('receive',data =>{
    append(`${data.name}: ${data.message}`,'left');
})

//if the user leave append the user to the container
socket.on('leave',name =>{
    append(`${name}: leave the chat`,'right');
})


//if the form get submit send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`you:${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";
})