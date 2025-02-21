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

io.on("connection",(socket) =>{
    socket.on("send_message",(data)=>{
        console.log("message received: " , data);
        socket.broadcast.emit("receive_messages", data);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
})



server.listen(3000,()=> {
    console.log("Server has started");
});


