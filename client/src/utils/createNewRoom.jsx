export function createNewRoom(roomName) {
    const id = Math.round(Math.random() * 1E8);
    const newRoom = {
        id: id,
        type: "multicast",
        name: roomName,
        members: [], // have to put user and others here
        messages: []
    };
    return newRoom;
}
