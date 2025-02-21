import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SocketContext from './context/socketContext'
import ChatRoom from './pages/ChatRoom'
import io from "socket.io-client";


function App() {
  const socket = io.connect("http://localhost:3000");

  return (
    <>
    <SocketContext.Provider value = {socket}>
      <ChatRoom/>
    </SocketContext.Provider>
    </>
  )
}

export default App
