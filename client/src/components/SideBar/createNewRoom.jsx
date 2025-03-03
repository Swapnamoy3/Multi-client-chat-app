import React from 'react';
import { createNewRoom } from '../../utils/createNewRoom';

export function CreateNewRoom({ ref, setRooms }) {
    const [roomName, setRoomName] = React.useState(""); // room name

    function closeCreateRoom() {
        ref.current.close();
    }
    function createRoomHandler(event) {
        event.preventDefault();
        const newRoom = createNewRoom(roomName, Math.round(Math.random() * 1E8), 'multicast');
        setRooms((rooms) => [...rooms, newRoom]);
        setRoomName("");
        closeCreateRoom();
    }
    return (
        <dialog
            ref={ref}
            className="p-6 rounded-lg shadow-lg bg-white w-96 max-w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-gray-900/50 backdrop-blur-2xl"
        >

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Room</h2>

            <form
                onSubmit={createRoomHandler}
                className="space-y-4">
                <input
                    type="text"
                    value={roomName}
                    onChange={(event) => setRoomName(() => event.target.value)}
                    placeholder="Room Name"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                    Create Room
                </button>
            </form>

            <button
                onClick={() => closeCreateRoom()}
                className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm cursor-pointer">
                Cancel
            </button>

        </dialog>
    );
}
