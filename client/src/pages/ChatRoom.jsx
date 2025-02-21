import React from 'react'
import MainChatArea from '../components/MainChatArea'
import SideBar from '../components/SideBar'


/*
const room = {
    id: ,
    type: "broadcast", "multicast", "direct",
    members: [],
    messages: []
}

*/
export default function ChatRoom() {
    const [room, setRoom] = React.useState({});
    const [rooms, setRooms] = React.useState([]);
  return (
    // <!-- Main Container -->
    <div class="flex h-screen">
        {/* <!-- Left Sidebar - Client List --> */}
        <SideBar/>

        {/* <!-- Main Chat Area --> */}
        <MainChatArea/>
    </div>
  )
}
