/*
messages: {
    message,
    type: sent or received,
    time
    sender
}
*/
export function createMessage(data, type, sender) {
    const newMessage = {
        message: data,
        type: type,
        time: new Date().toLocaleTimeString(),
        sender: sender
    };
    return newMessage;
}
