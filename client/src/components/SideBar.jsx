import React from 'react'
import SocketContext from '../context/socketContext'
import { useContext } from 'react'
import { ClientItem } from './SideBar/ClientItem';
import { AcceptInvite } from './SideBar/AcceptInvite';
import { CreateNewRoom } from './SideBar/createNewRoom';
import { createMessage } from '../utils/createMessage';
import { insertMessage } from '../utils/insertMessage';
import { useRoomUtils } from '../context/useRoomUtils';



export default function SideBar({ rooms, setRooms, room, setRoom}) {
    const socket = useContext(SocketContext);
    const createRoomDialogRef = React.useRef(null);
    const acceptInviteDialogRef = React.useRef(null);
    function openCreateRoom() {
        createRoomDialogRef.current.showModal();
    }


    const [, switchRooms] = useRoomUtils(rooms, setRooms, room, setRoom);


    React.useEffect(()=>{
        socket.on("receive_messages", (sender, data)=>{
            const senderRoom = rooms.find(r => r.id == sender);
            const newMessage = createMessage(data, "received", sender);
            if(senderRoom){
                switchRooms(senderRoom.id);
                setRoom( room => insertMessage(room, newMessage));
            }else{
                const broadCastRoom = rooms.find(r => r.type == "broadcast")
                switchRooms(broadCastRoom.id);
                setRoom( room =>insertMessage(room, newMessage));
            }
        })
    },[]);

  return (
      <div class="w-1/4 bg-white border-r border-gray-200">
            <CreateNewRoom ref={createRoomDialogRef} setRooms = {setRooms} />
            <AcceptInvite ref = {acceptInviteDialogRef}/>
            
            <div class="p-4 bg-gray-50 border-b border-gray-200 flex justify-between">
                <h2 class="text-xl font-semibold text-gray-800">Active Clients</h2>
                {/* for creating new room */}
                <span 
                    onClick={openCreateRoom}
                    className='bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer active:scale-95 hover:bg-gray-300'> 
                    <i class="fa-solid fa-plus"></i> 
                </span>
            </div>

            <div class="overflow-y-auto h-[calc(100vh-4rem)]">
                {/* <!-- Client Items --> <!-- Repeat client items as needed --> */}
                {rooms.map((room, index) => (
                    <ClientItem onClick = {() => switchRooms(room.id)} key={index} name={room.name} status={"Online"} type={room.type} />
                ))}

            </div>

        </div>
  )
}
