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

    React.useEffect(() => {
      console.log(rooms)
    },[rooms])

    function switchRooms(roomId){
        const nextRoom = rooms.find(room => room.id == roomId);
        
    }
  return (
    // <!-- Main Container -->
    <div class="flex h-screen">
        {/* <!-- Left Sidebar - Client List --> */}
        <SideBar rooms = {rooms} setRooms = {setRooms} room = {room} setRoom = {setRoom} />

        {/* <!-- Main Chat Area --> */}
        <MainChatArea/>
    </div>
  )
}
