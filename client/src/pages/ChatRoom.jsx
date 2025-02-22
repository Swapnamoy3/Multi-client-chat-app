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
    const defaultBroadCastRoom = {
      id: Math.round(Math.random()*1E8),
      type: "broadcast",
      name: "Broadcast Room",
      members: [],
      messages: []
    }
    const [room, setRoom] = React.useState(defaultBroadCastRoom);
    const [rooms, setRooms] = React.useState([defaultBroadCastRoom]);

    React.useEffect(() => {
      console.log(rooms)
    },[rooms])

    
  return (
    // <!-- Main Container -->
    <div class="flex h-screen">
        {/* <!-- Left Sidebar - Client List --> */}
        <SideBar rooms = {rooms} setRooms = {setRooms} room = {room} setRoom = {setRoom} />

        {/* <!-- Main Chat Area --> */}
        <MainChatArea room = {room} setRoom = {setRoom} />
    </div>
  )
}
