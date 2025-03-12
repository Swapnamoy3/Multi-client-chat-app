import React from 'react'
import ChatRoom from './ChatRoom'
import io from "socket.io-client";
import SocketContext from '../context/socketContext';
import AuthContext from '../context/AuthContext';
export default function ChatApp() {
    const [socket,setSocket] = React.useState();
    const user = React.useContext(AuthContext);
    React.useEffect(()=>{
        async function getSocket(){
            const socket = await io.connect("http://localhost:3000");
            socket.emit("hello", user);
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
