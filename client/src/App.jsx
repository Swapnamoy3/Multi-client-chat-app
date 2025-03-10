import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SocketContext from './context/socketContext'
import ChatRoom from './pages/ChatRoom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import io from "socket.io-client";


function App() {
  const [socket,setSocket] = React.useState();
  React.useEffect(async ()=>{
    const socket = await io.connect("http://localhost:3000");
    setSocket(()=> socket);
  },[]);

  return (
    <>
    {socket && <SocketContext.Provider value = {socket}>
      <Login/>
    </SocketContext.Provider>}
    </>
  )
}

export default App
