const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom, getAllRooms } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
    console.log('New WebSocket connection!');

    const rooms = getAllRooms()
    socket.emit('roomList', rooms)

    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Welcome!', 'Admin'))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined the chat.`, 'Admin'))
        
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        
        callback()
    })


    socket.on('messageSentFromClient', (message, callback) => {
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }
        const user = getUser(socket.id)
        io.to(user.room).emit('message', generateMessage(message, user.username))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage(`${user.username} has left.`, 'Admin'))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })

    socket.on('location', (location, callback) => {
        const username = getUser(socket.id).username
        io.emit('locationMessage', generateLocationMessage(location, username))
        callback()
    })
})



server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})