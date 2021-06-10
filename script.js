const socket = io()

socket.emit('ping')
console.log('Ping?')

socket.on('pong', () => {
    console.log('Pong!')
})