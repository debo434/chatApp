//This is my Node server which will handel socket io

const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
});


const users = {}


io.on('connection', socket => {

    //when new user join broadcast a message with others
    socket.on('new-user-joined', name => {
        //console.log("new user",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    //when someone send the message it will serve with others 
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    //when someone leave the chat it will notified with others
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
})