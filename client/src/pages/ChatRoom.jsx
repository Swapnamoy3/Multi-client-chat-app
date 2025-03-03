import React from 'react'
import MainChatArea from '../components/MainChatArea'
import SideBar from '../components/SideBar'
import SocketContext from '../context/socketContext'
import { createNewRoom } from '../utils/createNewRoom'
import { insertMessage } from '../utils/insertMessage'
import { useRoomUtils } from '../context/useRoomUtils'
import { createMessage } from '../utils/createMessage'
/*
const room = {
    id: ,
    type: "broadcast", "multicast", "direct",
    name: "Broadcast Room",
    members: [],
    messages: []
}

*/


const defaultBroadCastRoom = createNewRoom("Broadcast Room", Math.round(Math.random()*1E8), 'broadcast');

export default function ChatRoom() {
  const socket = React.useContext(SocketContext);
  const [room, setRoom] = React.useState(defaultBroadCastRoom);
  const [rooms, setRooms] = React.useState([defaultBroadCastRoom]);
  const [onlineMembers, setOnlineMembers] = React.useState([]);
  const [, switchRooms] = useRoomUtils(rooms, setRooms, room, setRoom);


    React.useEffect(() => {
      console.log(rooms)
    },[rooms]);

    React.useEffect(()=>{
      socket.on("online_members", (data) =>{
        console.log(data)
          const directRooms = data.map( person => createNewRoom(person, person, "Direct"))
          setOnlineMembers(()=> directRooms)
          
          setRooms((rooms) => [...rooms.filter(r => r.type != "Direct"), ...directRooms]);
      });
  },[]);

  React.useEffect(()=>{
      socket.on("receive_messages", (type,sender, data)=>{
          const newMessage = createMessage(data, "received", sender);
          if(type == 'broadcast'){
              const broadCastRoom = rooms.find(r => r.type == "broadcast")
              switchRooms(broadCastRoom.id);
              setRoom( room =>insertMessage(room, newMessage));
              console.log("received broadcast message") 
          }
          else if(type == 'direct'){
            const senderRoom = rooms.find(r => r.id === sender);
            if (senderRoom) {
              switchRooms(senderRoom.id);
              setRoom(room => insertMessage(room, newMessage));
            } else {
              console.error("Room not found for sender:", sender);
            }
          }
      })

      return () => socket.off("receive_messages"); // Cleanup
  },[rooms, switchRooms]);
  

    
  return (
    <div class="flex h-screen">
        <SideBar rooms = {rooms} setRooms = {setRooms} room = {room} setRoom = {setRoom} onlineMembers = {onlineMembers} />

        <MainChatArea room = {room} setRoom = {setRoom} />
    </div>
  )
}
