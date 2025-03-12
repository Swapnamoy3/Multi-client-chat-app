const { getUser, updateUser } = require("./database.js");

function setupIO(io) {
    const userSocketMap = new Map();
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
        socket.on("hello", (user) => {
            console.log(user)
            userSocketMap.set(socket.id, user);
            const userObj = getUser(user.email);
            if(!userObj) return;
            userObj.socketID = socket.id;
            updateUser(userObj.id, userObj);
            console.log(userObj);
        })
        
        emitOnlineMembers();
    
        
        socket.on("send_message_broadcast",(data)=>{
            console.log("message received: " , data);    
            const sender = socket.id;
            const type = "broadcast";
            const roomName = "broadcast";
            const senderName = userSocketMap.get(sender).name;
            socket.broadcast.emit("receive_messages",type, roomName, sender, senderName, data);
        })
        
        
        socket.on("send_message_direct", (receiver, data) =>{
            const sender = socket.id;
            const type = "direct";
            console.log("message received: " , data);
            console.log("sender: ", sender);
            console.log("receiver: ", receiver);
            const roomName = sender;
            const senderName = userSocketMap.get(sender).name;
            socket.to(receiver).emit("receive_messages",type, roomName, sender, senderName, data);
        })
    
        socket.on("send_message_multicast", (roomName, data) => {
            const sender = socket.id;
            const type = "multicast";
            console.log("message received: " , data);
            console.log("sender: ", sender);
            console.log("room: ", roomName);
            const senderName = userSocketMap.get(sender).name;
            socket.to(roomName).emit("receive_messages",type, roomName, sender, senderName, data);
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
            const email = userSocketMap.get(socket.id) && userSocketMap.get(socket.id).email;
            if(email){
                const user = getUser(email);
                user.socketID = null;
                updateUser(user.id, user);
                delete userSocketMap[socket.id];
                console.log("User deleted from map");   
            }
            emitOnlineMembers(socket);
        });
    })
}

module.exports = setupIO;