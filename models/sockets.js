
const { BringAllUsers, LogOut, SendMessage } = require('../controllers/socket');
const { checkToken } = require('../services/checkToken');

class Socket{
    
    constructor( io ){
        this.io = io;

        this.socketsEvents();
    }

    socketsEvents(){
        
        this.io.on("connection", async ( socket ) => {

            const [exists, uid] = checkToken(socket.handshake.query.token);
            
            if(!exists)
            {
                socket.disconnect();
                return;
            }

            this.io.emit("load-all-users", await BringAllUsers());

            socket.join(uid);
            //console.log('rooms ', this.io.sockets.adapter.rooms);
    
            socket.on('disconnect-user', async(uid) => {
                await LogOut(uid)
                console.log('dis');
                this.io.emit("load-all-users", await BringAllUsers());
            });

            socket.on("disconnect", async(reason) => {
                setTimeout(async() => {
                    this.io.emit("load-all-users", await BringAllUsers());
                }, 1200);
            });

            socket.on('private-msg', async(payload) => {

                const { myUid, friendUid, message} = payload;
                const newMessage = await SendMessage(payload);

                this.io.to(friendUid).to(myUid).emit('add-msg-to-chat', newMessage);
                //this.io.to(myUid).emit('add-msg-to-chat', newMessage);
            })

        });

    }
}

module.exports = Socket;