import React from 'react'
import SocketContext from '../context/socketContext'
import { useContext } from 'react'
import { ClientItem } from './SideBar/ClientItem';
import { AcceptInvite } from './SideBar/AcceptInvite';
import { CreateNewRoom } from './SideBar/createNewRoom';
import { useRoomUtils } from '../hooks/useRoomUtils';



export default function SideBar({ rooms, setRooms, room, setRoom, onlineMembers }) {
    const socket = useContext(SocketContext);
    const createRoomDialogRef = React.useRef(null);
    const acceptInviteDialogRef = React.useRef(null);
    const [, switchRooms] = useRoomUtils(rooms, setRooms, room, setRoom);

    function openCreateRoom() {
        createRoomDialogRef.current.showModal();
    }




    

  return (
      <div class="w-1/4 bg-white border-r border-gray-200">
            <CreateNewRoom ref={createRoomDialogRef} setRooms = {setRooms} onlineMembers = {onlineMembers}/>
            <AcceptInvite ref = {acceptInviteDialogRef} setRooms = {setRooms}/>

            <div class="p-4 bg-gray-50 border-b border-gray-200 flex justify-between">
                <h2 class="text-xl font-semibold text-gray-800">Active Clients</h2>
                {/* for creating new room */}
                <span 
                    onClick={openCreateRoom}
                    className='bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer active:scale-95 hover:bg-gray-300'
                > 
                    <i class="fa-solid fa-plus"></i> 
                </span>
            </div>

            <div class="overflow-y-auto h-[calc(100vh-4rem)]">
                {/* <!-- Client Items --> <!-- Repeat client items as needed --> */}
                {rooms.map((r, index) => (
                    <ClientItem 
                        onClick = {() => switchRooms(r.id)} 
                        key={index} name={r.name} 
                        status={"Online"} 
                        type={r.type} 
                        selected = {r.id == room.id}
                    />
                ))}

            </div>

        </div>
  )
}
