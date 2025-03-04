import React from 'react';
import { createNewRoom } from '../../utils/createNewRoom';
import SocketContext from '../../context/socketContext';


export function CreateNewRoom({ ref, setRooms, onlineMembers }) {
    const socket = React.useContext(SocketContext);
    const [roomName, setRoomName] = React.useState(""); // room name
    const [selectedMembers, setSelectedMembers] = React.useState([]);

    function closeCreateRoom() {
        ref.current.close();
    }
    function HandelSelectMember(event, member) {
        if(event.target.checked) setSelectedMembers(s => [...s, member]);
        else setSelectedMembers( s => s.filter( mem => mem !== member));
    }



    function createRoomHandler(event) {
        event.preventDefault();
        if(roomName.trim() === '') return;
        const newRoom = createNewRoom(roomName, Math.round(Math.random() * 1E8), 'multicast');
        
        socket.emit("create_room", selectedMembers, roomName);
        console.log(selectedMembers);

        setRooms((rooms) => [...rooms, newRoom]);
        setRoomName("");
        closeCreateRoom();
    }   


    React.useEffect(()=>{
        console.log(selectedMembers);
    },[selectedMembers]);
    return (
        <dialog
            ref={ref}
            className="p-6 rounded-lg shadow-lg bg-white w-96 max-w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-gray-900/50 backdrop-blur-2xl"
        >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Room</h2>

        <form onSubmit={createRoomHandler} className="space-y-4">
            <input
                type="text"
                value={roomName}
                onChange={(event) => setRoomName(event.target.value)}
                placeholder="Room Name"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <fieldset className="border rounded-lg p-4">
                <legend className="text-gray-800 font-medium px-2">Select Members</legend>
                <ul className="space-y-2 max-h-48 overflow-y-auto">
                    {onlineMembers.map((member) => (
                    <li
                        key={member}
                        className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition shadow-sm"
                    >
                        <input
                            onClick={event => HandelSelectMember(event, member)}
                            type="checkbox"
                            name={member}
                            id = {member}
                            className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                        />
                        <label className="text-gray-700 cursor-pointer" for = {member} >{member}</label>
                    </li>
                    ))}
                </ul>
            </fieldset>

            <button
                onClick={createRoomHandler}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
            Create Room
            </button>
        </form>

        <button
            onClick={() => closeCreateRoom()}
            className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm"
        >
            Cancel
        </button>
        </dialog>

    );
}



/**
 * import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";

export default function OnlineMembersList({ members, selectedMembers, onSelect }) {
    return (
        <div className="max-h-60 overflow-y-auto border rounded-lg p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Online Members</h3>
            <ul className="space-y-2">
                {members.map((member) => (
                    <li
                        key={member.id}
                        onClick={() => onSelect(member.id)}
                        className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${selectedMembers.includes(member.id) ? "bg-blue-100" : "hover:bg-gray-100"}`}
                    >
                        {selectedMembers.includes(member.id) ? (
                            <CheckCircle className="text-blue-500 mr-3" size={20} />
                        ) : (
                            <Circle className="text-gray-400 mr-3" size={20} />
                        )}
                        <span className="text-gray-700 font-medium">{member.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

 */