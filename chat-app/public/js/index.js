const socket = io()

// templates
const roomListTemplate = document.getElementById("room-list-template").innerHTML

socket.on('roomList', (rooms) => {
    console.log("Rooooms: ");
    const keys = Object.keys(rooms);
    const values = Object.values(rooms);
    const roomsTest = [
        {
            "room": "bursa",
            "pop": 2
        },
        {
            "room": "istanbul",
            "pop": 3
        },
        {
            "room": "bursa",
            "pop": 2
        },
        {
            "room": "istanbul",
            "pop": 3
        },
        {
            "room": "bursa",
            "pop": 2
        },
        {
            "room": "istanbul",
            "pop": 3
        }
    ]
    // console.log(keys);
    // console.log(values);
    const html = Mustache.render(roomListTemplate, {
        rooms: roomsTest
    })

    document.getElementById('room-selection').innerHTML = html
})

function enter(room) {
    document.getElementById('room-input').value = room;
    alert('Room: ' + room + ' is selected!')
}





