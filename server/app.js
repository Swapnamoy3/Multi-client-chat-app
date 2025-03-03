const express = require("express");
const cors = require("cors")
const http = require('http')
const {Server} = require("socket.io")
const log = require("./logger.js");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET','POST']
    }
})




function emitOnlineMembers(){
    io.fetchSockets().then((data) => {
        const socketIDs = data.map( client_socket => client_socket.id);
        socketIDs.forEach((id) => {
            io.to(id).emit("online_members", socketIDs.filter((sid) => sid != id));
        })
    })
}


io.on("connection",(socket) =>{
    console.log("User Connected", socket.id)

    
    emitOnlineMembers();

    
    socket.on("send_message_broadcast",(data)=>{
        console.log("message received: " , data);    
        const sender = socket.id;
        const type = "broadcast";
        socket.broadcast.emit("receive_messages",type, sender, data);
    })


    socket.on("send_message_direct", (receiver, data) =>{
        const sender = socket.id;
        const type = "direct";
        console.log("message received: " , data);
        console.log("sender: ", sender);
        console.log("receiver: ", receiver);
        socket.to(receiver).emit("receive_messages",type, sender, data);
    })
    
    
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
        emitOnlineMembers(socket);
    });
})



server.listen(3000,()=> {
    console.log("Server has started");
});


