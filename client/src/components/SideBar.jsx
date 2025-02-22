import React from 'react'
import SocketContext from '../context/socketContext'
import { useContext } from 'react'

function ClientItem({ name, status, type, onClick }) {
    let bgColor = "bg-white"; // Default for direct conversation
    let borderColor = "border-gray-100";

    if (type === "broadcast") {
        bgColor = "bg-blue-100"; // Light blue for broadcast
        borderColor = "border-blue-300";
    } else if (type === "multicast") {
        bgColor = "bg-green-100"; // Light green for multicast
        borderColor = "border-green-300";
    }

    return (
        <div
        onClick={onClick}
        className={`p-4 border-b ${borderColor} hover:bg-gray-50 cursor-pointer ${bgColor}`}>
            <div className="flex items-center space-x-3">
                <img src="https://loremflickr.com/40/40/avatar" alt={name} className="w-8 h-8 rounded-full" />
                <div>
                    <h3 className="font-medium text-gray-800">{name}</h3>
                    <p className="text-sm text-gray-500">{status}</p>
                </div>
            </div>
        </div>
    );
}

function CreateNewRoom({ ref, socket, setRooms}) {
    const [roomName, setRoomName] = React.useState("") // room name

    function closeCreateRoom(){
        ref.current.close();
    }
    function createRoom(event){
        event.preventDefault();
        const id = Math.round(Math.random()*1E8);
        const newRoom = {
            id: id,
            type: "multicast",
            name: roomName,
            members: [], // have to put user and others here
            messages: []
        };
        setRooms((rooms) => [...rooms, newRoom]);
        setRoomName("");
        closeCreateRoom();
    }
    return (
        <dialog ref={ref} 
        className="p-6 rounded-lg shadow-lg bg-white w-96 max-w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-gray-900/50 backdrop-blur-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Room</h2>
            <form 
                onSubmit={createRoom}
                className="space-y-4">
                <input 
                    type="text" 
                    value={roomName}
                    onChange={(event) => setRoomName( r => event.target.value )}
                    placeholder="Room Name" 
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                    Create Room
                </button>
            </form>
            <button 
            onClick={closeCreateRoom}
            className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm cursor-pointer">
                Cancel
            </button>
        </dialog>
    );
}


function AcceptInvite({ ref }) {
    function declineInvite(){
        // send decline
        ref.current.close();
    }

    function acceptInvite(){
        //send an accept event
        ref.current.close();
    }
    return (
        <dialog ref={ref} className="p-6 rounded-lg shadow-lg bg-white w-96 max-w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-gray-900/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Accept Invitation</h2>
            
            <p className="text-gray-600 mb-4">You have been invited to join a room. Do you want to accept the invitation?</p>
            
            <div className="flex justify-end space-x-3">
                <button 
                    onClick={declineInvite} 
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
                    Decline
                </button>
                <button 
                    onClick={acceptInvite}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Accept
                </button>
            </div>
        </dialog>
    );
}



export default function SideBar({ rooms, setRooms, room, setRoom }) {
    const socket = useContext(SocketContext);
    const createRoomDialogRef = React.useRef(null);
    const acceptInviteDialogRef = React.useRef(null);
    function openCreateRoom() {
        acceptInviteDialogRef.current.showModal();
    }

    function switchRooms(roomId){
        const nextRoom = rooms.find(room => room.id == roomId);
        const currRoom = room;
        //update Rooms state
        setRooms((rooms) => {
            return [...rooms.filter(r => r.id != currRoom.id), currRoom];
        })
        setRoom(() => nextRoom);
        console.log(nextRoom);
    }
  return (
      <div class="w-1/4 bg-white border-r border-gray-200">
            <CreateNewRoom ref={createRoomDialogRef} socket={socket} setRooms = {setRooms} />
            <AcceptInvite ref = {acceptInviteDialogRef}/>
            <div class="p-4 bg-gray-50 border-b border-gray-200 flex justify-between">
                <h2 class="text-xl font-semibold text-gray-800">Active Clients</h2>
                {/* for creating new room */}
                <span 
                onClick={openCreateRoom}
                className='bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer active:scale-95 hover:bg-gray-300'> <i class="fa-solid fa-plus"></i> </span>
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
