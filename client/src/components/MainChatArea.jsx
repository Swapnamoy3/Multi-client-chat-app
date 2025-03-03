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
    const [messageInput, setMessagesInput] = React.useState([]);
    const socket = useContext(SocketContext);

    React.useEffect(() =>{
        socket.on("receive_messages",(sender ,data) =>{ //data is the message, sender is the sender ID
            const newMessage = createMessage(data, "received", sender);
            setRoom( room => insertMessage(room, newMessage));
        })
    },[])

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
            <MessageInput messageInput = {messageInput} setMessagesInput = {setMessagesInput} setRoom = {setRoom} socket = {socket}/>
        </div>
  )
}
