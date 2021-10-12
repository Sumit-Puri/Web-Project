class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        //here io is given to us by the cdn library included in home.ejs
        this.socket = io.connect('http://3.95.212.218:5000');
        if(this.userEmail){
        this.connectionHandler();
        }
    }
    connectionHandler(){
        let self =this;
        //when connect event occurs
        this.socket.on('connect',function(){
            console.log('connection established using sockets....!');

            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom: 'Social'
            });
            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            });
        });
        //send message on clicking send 
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'Social'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })

    }
}