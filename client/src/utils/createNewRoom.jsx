export function createNewRoom(roomName, id , type) {

    const newRoom = {
        id: id,
        type: type,
        name: roomName,
        members: [], // have to put user and others here
        messages: [],
        time: Date.now(),
    };
    return newRoom;
}
