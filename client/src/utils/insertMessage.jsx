export function insertMessage(room, newMessage) {
    return {
        ...room,
        messages: [...room.messages, newMessage]
    };
}
