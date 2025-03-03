export function useRoomUtils(rooms, setRooms, room, setRoom) {

    function saveRoom(currRoom) {
        setRooms((rooms) => {
            return [...rooms.filter(room => room.id != currRoom.id), currRoom];
        });
    }

    function switchRooms(roomId) {
        const nextRoom = rooms.find(room => room.id == roomId);
        const currRoom = room;
        saveRoom(currRoom);
        setRoom(() => nextRoom);
    }

    return [saveRoom, switchRooms];
}
