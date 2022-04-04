const socket = io()

// elements
const $messageInput = document.getElementById('message-input')
const $messageSendButton = document.getElementById('send-message-button')
const $locationButton = document.getElementById('location')
const $messages = document.getElementById('messages')

// templates
const messageTemplate = document.getElementById('message-template').innerHTML
const locationMessageTemplate = document.getElementById('location-message-template').innerHTML

// constants
const MY_DATE_FORMAT = "HH:mm"

// options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })
console.log(username, room);

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        username: message.username,
        createdAt: moment(message.createdAt).format(MY_DATE_FORMAT)
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (location) => {
    const html = Mustache.render(locationMessageTemplate, {
        url: location.url,
        username: location.username,
        createdAt: moment(location.createdAt).format(MY_DATE_FORMAT)
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageSendButton.onclick = (e) => {
    e.preventDefault()
    socket.emit('messageSentFromClient', $messageInput.value, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Message is delivered.');
        }
    })
    $messageInput.value = ""
}

$locationButton.onclick = () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    if (confirm('Are you sure to send your location info.')) {
        
        navigator.geolocation.getCurrentPosition((location) => {
            const myLocation = {
                long: location['coords']['longitude'],
                lat: location['coords']['latitude']
            }
            socket.emit('location', myLocation, () => {
                console.log('Location shared.');
            })
        })
    }
}

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})


