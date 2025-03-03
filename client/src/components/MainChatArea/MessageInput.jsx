import React from 'react';

export function MessageInput({ messageInput, setMessagesInput, setRoom, socket }) {
    function sendMessages(event) {
        event.preventDefault();
        if (messageInput.trim() !== "") {
            socket.emit("send_message", messageInput);
            const newMessage = {
                message: messageInput,
                type: 'sent',
                time: new Date().toLocaleTimeString(),
                sender: "You"
            };

            setRoom(room => {
                console.log("this is the room", room);
                socket.emit("send_message_direct", room.id, messageInput);
                return {
                    ...room,
                    messages: [...room.messages, newMessage]
                };
            });
            setMessagesInput("");
        }
    }
    return (
        <div className="p-4 bg-white border-t border-gray-200">
            <form
                onSubmit={sendMessages}
                className="flex space-x-2">
                <input type="text"
                    value={messageInput}
                    onChange={(event) => setMessagesInput(event.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Send
                </button>
            </form>
        </div>
    );
}
