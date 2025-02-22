import React from 'react'
import SocketContext from '../context/socketContext'
import { useContext } from 'react'
function ChatHeader() {
    return(
        <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex items-center space-x-3">
                <img src="https://loremflickr.com/40/40/avatar" alt="Selected Client" className="w-8 h-8 rounded-full"/>
                <div>
                    <h2 className="font-semibold text-gray-800">Group Chat</h2>
                    <p className="text-sm text-gray-500">3 participants</p>
                </div>
            </div>
        </div>
    )
}


function MessageReceived({message, time}) {
    return(
        <div className="flex items-start gap-2">
            <img src="https://loremflickr.com/32/32/avatar" alt="User" className="w-6 h-6 rounded-full mt-2"/>
            <div className="max-w-[70%]">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-gray-800">{message}</p>
                    <span className="text-xs text-gray-500 mt-1">{time || "10:30 AM"}</span>
                </div>
            </div>
        </div>
    )
}

function MessageSent({message, time}) {
    return(
        <div className="flex items-start gap-2 justify-end">
            <div className="max-w-[70%]">
                <div className="bg-blue-600 text-white p-3 rounded-lg shadow-sm">
                    <p>{message}</p>
                    <span className="text-xs text-blue-100 mt-1">{time || "10:31 AM"}</span>
                </div>
            </div>
            <img src="https://loremflickr.com/32/32/avatar" alt="You" className="w-6 h-6 rounded-full mt-2"/>
        </div>
    )
}

/*
messages: {
    message, 
    type: sent or received,
    time
}
*/

function MessageInput({messageInput, setMessagesInput, setRoom, socket}) {
    function sendMessages(event) {
        event.preventDefault();
        if (messageInput.trim() !== "") {
            socket.emit("send_message", messageInput);
            const newMessage = {
                message: messageInput, 
                type: 'sent',
                time: new Date().toLocaleTimeString()
            };

            setRoom( room => {
                console.log("this is the room", room)
                return {
                    ...room,
                    messages: [...room.messages, newMessage]
                };
            })
            setMessagesInput("");
        }
    }
    return(
        <div className="p-4 bg-white border-t border-gray-200">
            <form 
            onSubmit={sendMessages}
            className="flex space-x-2">
                <input type="text" 
                        value={messageInput}
                        onChange={(event)=>setMessagesInput(event.target.value)}
                        placeholder="Type your message..." 
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"/>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Send
                </button>
            </form>
        </div>
    )
}

export default function MainChatArea({room, setRoom}) {
    const [messageInput, setMessagesInput] = React.useState([]);
    const socket = useContext(SocketContext);
    React.useEffect(() =>{
        socket.on("receive_messages", data =>{
            const newMessage = {
                message: data, 
                type: 'received',
                time: new Date().toLocaleTimeString()
            };

            setRoom( room => {
                return {
                    ...room,
                    messages: [...room.messages, newMessage]
                };
            })
        })
    },[])

  return (
        <div className="flex-1 flex flex-col">
            {/* <!-- Chat Header --> */}
            <ChatHeader/>

            {/* <!-- Messages Container --> */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                
                {room && room.messages && room.messages.map( (message, index) => {
                    if(message.type === 'sent')
                        return <MessageSent key = {index} message = {message.message} time = {message.time}/>
                    else return <MessageReceived key = {index} message = {message.message} time = {message.time}/>
                })}

                

            </div>

            {/* <!-- Message Input --> */}
            <MessageInput messageInput = {messageInput} setMessagesInput = {setMessagesInput} setRoom = {setRoom} socket = {socket}/>
        </div>
  )
}
