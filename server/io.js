function setupIO(io) {
    
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
            const roomName = "broadcast";
            socket.broadcast.emit("receive_messages",type, roomName, sender, data);
        })
        
        
        socket.on("send_message_direct", (receiver, data) =>{
            const sender = socket.id;
            const type = "direct";
            console.log("message received: " , data);
            console.log("sender: ", sender);
            console.log("receiver: ", receiver);
            const roomName = sender;
            socket.to(receiver).emit("receive_messages",type, roomName, sender, data);
        })
    
        socket.on("send_message_multicast", (roomName, data) => {
            const sender = socket.id;
            const type = "multicast";
            console.log("message received: " , data);
            console.log("sender: ", sender);
            console.log("room: ", roomName);
            socket.to(roomName).emit("receive_messages",type, roomName, sender, data);
        })
    
        socket.on("create_room", (selectedMembers, roomName) => {
            // make sure uniquen room name
            socket.join(roomName);
            console.log("room created: ", roomName);
            selectedMembers.forEach(member => {
                socket.to(member).emit("room_invite", roomName);
            })
        })
    
        socket.on("accept_room_invite", (roomName) => {
            socket.join(roomName);
            console.log(socket.id," room joined: ", roomName);
        })
        
        
        socket.on("disconnect", () => {
            console.log("User Disconnected", socket.id);
            emitOnlineMembers(socket);
        });
    })
}

module.exports = setupIO;