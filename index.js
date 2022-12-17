const io=require('socket.io')(8000, {cors: {origin: "*"}} );//any port can be taken. Socket.io server is attached to an instance of http. It listens to incoming events.
//socket is a particular connection

const users={};

//io.on v/s socket.on both taken in custom events and callbacks
//io.on is actually socket.io.on that is, it is a socket.io instance of http. It listens to multiple socket connections
//socket.on works on a particular connection
io.on('connection', socket=>{
  //If any new user joins, let other users connected to the server know it.
    socket.on('new-user-joined', name=>{
        console.log(name);
     users[socket.id]=name;
     socket.broadcast.emit('user-joined', name)//socket.broadcast.emit emits a msg to all except the socket connection which has joined 
  });

socket.on('send', message=>{
    socket.broadcast.emit('receive', {message:message, name:users[socket.id]})
});


socket.on('disconnect', message=>{
    socket.broadcast.emit('user-left', users[socket.id]);
    delete users[socket.id]
} )


})
