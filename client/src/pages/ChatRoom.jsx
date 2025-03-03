import React from 'react'
import MainChatArea from '../components/MainChatArea'
import SideBar from '../components/SideBar'
import SocketContext from '../context/socketContext'

/*
const room = {
    id: ,
    type: "broadcast", "multicast", "direct",
    name: "Broadcast Room",
    members: [],
    messages: []
}

*/

const defaultBroadCastRoom = {
  id: Math.round(Math.random()*1E8),
  type: "broadcast",
  name: "Broadcast Room",
  members: [],
  messages: []
}

export default function ChatRoom() {
  const socket = React.useContext(SocketContext);
  const [room, setRoom] = React.useState(defaultBroadCastRoom);
  const [rooms, setRooms] = React.useState([defaultBroadCastRoom]);
  const [onlineMembers, setOnlineMembers] = React.useState([]);
    


    React.useEffect(() => {
      console.log(rooms)
    },[rooms]);

    React.useEffect(()=>{
      socket.on("online_members", (data) =>{
        console.log(data)
          const directRooms = data.map(person => {
            return {
              id: person,
              type: "Direct",
              name: person,
              members: [],
              messages: []
            }
          });
          setOnlineMembers(()=> directRooms)
          
          setRooms((rooms) => [...rooms.filter(r => r.type != "Direct"), ...directRooms]);
      });
  },[]);

    
  return (
    <div class="flex h-screen">
        <SideBar rooms = {rooms} setRooms = {setRooms} room = {room} setRoom = {setRoom} onlineMembers = {onlineMembers} />

        <MainChatArea room = {room} setRoom = {setRoom} />
    </div>
  )
}
