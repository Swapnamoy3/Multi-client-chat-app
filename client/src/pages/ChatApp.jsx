import React from 'react'
import ChatRoom from './ChatRoom'
import io from "socket.io-client";
import SocketContext from '../context/socketContext';
export default function ChatApp() {
    const [socket,setSocket] = React.useState();
    
    React.useEffect(()=>{
        async function getSocket(){
            const socket = await io.connect("http://localhost:3000");
            setSocket(()=> socket);
        }
        getSocket();
      },[]);
  return (
    <>
        {socket && <SocketContext.Provider value = {socket}>
            <ChatRoom/>
        </SocketContext.Provider>} 
    </>
  )
}
