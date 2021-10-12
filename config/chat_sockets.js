module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer, {
        cors: {
          origin: "http://3.95.212.218:8000",
          methods: ["GET", "POST"]
        }
      });

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);
        
        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        socket.on('join_room',function(data){
            console.log('joining request received',data);//receiving req to join the chatroom

            socket.join(data.chatroom);//this will make user join chatroom

            io.in(data.chatroom).emit('user_joined',data);//emits other user in the chatroom that requested user joined the chatroom
        });

         //detect send_message and broadcast to everyone in the room
         socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });
    });

    
};