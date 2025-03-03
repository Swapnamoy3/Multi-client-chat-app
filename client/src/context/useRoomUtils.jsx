export function useRoomUtils(rooms, setRooms, room, setRoom) {

    function saveRoom(currRoom) {
        setRooms((rooms) => {
            return [...rooms.filter(room => room.id != currRoom.id), currRoom].sort((a,b) => a.time - b.time);
        });
    }

    function switchRooms(roomId) {
        if(room.id == roomId) return;
        const nextRoom = rooms.find(room => room.id == roomId);
        const currRoom = room;
        saveRoom(currRoom);
        setRoom(() => nextRoom);
    }

    return [saveRoom, switchRooms];
}
