import React from 'react'
import SocketContext from '../context/socketContext'
import { useContext } from 'react'
import { ChatHeader } from './MainChatArea/ChatHeader'
import { MessageSent, MessageReceived } from './MainChatArea/Messages'
import { MessageInput } from './MainChatArea/MessageInput'
import { createMessage } from '../utils/createMessage'
import { insertMessage } from '../utils/insertMessage'

/*
messages: {
    message, 
    type: sent or received,
    time
    sender
}
*/
export default function MainChatArea({room, setRoom}) {
    const [messageInput, setMessageInput] = React.useState([]);
    const socket = useContext(SocketContext);

    function sendMessages(event) {
        event.preventDefault();

        if(messageInput.trim() == "") return;
        const newMessage = createMessage(messageInput, "sent", "You");

        if(room.type === "Direct"){
            socket.emit("send_message_direct", room.id, messageInput);
            console.log("sent direct message")
        }
        else if(room.type === "broadcast"){
            socket.emit("send_message_broadcast", messageInput);
            console.log("sent broadcast message")
        }
        else{
            socket.emit("send_message_multicast", room.name, messageInput);
            console.log("sent multicast message")
        }
        
        setRoom(room => insertMessage(room, newMessage));   
        setMessageInput("");
    }

  return (
        <div className="flex-1 flex flex-col">
            <ChatHeader/>

            {/* <!-- Messages Container --> */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                
                {room && room.messages && room.messages.map( (message, index) => {
                    if(message.type === 'sent')
                        return <MessageSent key = {index} message = {message.message} time = {message.time} sender = {message.sender}/>
                    else return <MessageReceived key = {index} message = {message.message} time = {message.time} sender = {message.sender}/>
                })}

                

            </div>

            {/* <!-- Message Input --> */}
            <MessageInput messageInput = {messageInput} setMessageInput = {setMessageInput} sendMessages={sendMessages}/>
        </div>
  )
}
