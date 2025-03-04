import React from 'react';
import SocketContext from '../../context/socketContext';
import { createNewRoom } from '../../utils/createNewRoom';

export function AcceptInvite({ ref, setRooms }) {
    const socket = React.useContext(SocketContext);
    const [invitedRoomName, setInvitedRoomName] = React.useState();
    function openAcceptInvite(){
        ref.current.showModal();
    }
    React.useEffect(() => {
        socket.on("room_invite", (roomName) => {
            console.log("room invite");
            setInvitedRoomName (() => roomName);
            openAcceptInvite();
        });
    },[])

    function declineInvite() {
        // send decline
        setInvitedRoomName("");
        ref.current.close();
    }

    function acceptInvite() {
        socket.emit("accept_room_invite", invitedRoomName);
        const newRoom = createNewRoom(invitedRoomName, Math.round(Math.random()*1E8), "multicast");
        setRooms(rooms => [...rooms, newRoom]);
        ref.current.close();
    }
    return (
        <dialog ref={ref} className="p-6 rounded-lg shadow-lg bg-white w-96 max-w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-gray-900/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Accept Invitation</h2>

            <p className="text-gray-600 mb-4">You have been invited to join {invitedRoomName}. Do you want to accept the invitation?</p>

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
