const generateMessage = (text, username) => {
    return {
        text,
        username,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (position, username) => {
    return {
        url: `https://www.google.com/maps?q=${position.lat},${position.long}`,
        username,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}