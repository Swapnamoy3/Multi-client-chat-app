import React from 'react';

export function MessageInput({ messageInput, setMessageInput, sendMessages }) {
    
    return (
        <div className="p-4 bg-white border-t border-gray-200">
            <form
                onSubmit={sendMessages}
                className="flex space-x-2">
                <input type="text"
                    value={messageInput}
                    onChange={(event) => setMessageInput(event.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Send
                </button>
            </form>
        </div>
    );
}
