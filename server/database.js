const { v4: uuidv4 } = require('uuid');
/*
user = {
    id: string,
    name: string,
    email: string,
    password: string, 
    backupEmail: string,
    backupPhone: string
}
*/
function createUser(name, email, password, backupEmail = "", backupPhone = "") {
    return {
        id: uuidv4(),
        name: name,
        email: email,
        password: password,
        backupEmail: backupEmail,
        backupPhone: backupPhone,
        socketID : null
    }
}

function saveUser(user) {
    users.push(user);
}

function getUser(email = null, id = null) {
    if(!email && !id) return null;
    if (id) return users.find(user => user.id === id);
    return users.find(user => user.email === email);
}

function updateUser(id, user){
    const index = users.findIndex(user => user.id === id);
    user.id = id;
    users[index] = user;
}

function setSocketID(id, socketID){
    const user = getUser("", id);
    user.socketID = socketID;
    updateUser(id, socketID);
}
module.exports = { createUser, saveUser, getUser, updateUser, setSocketID };
