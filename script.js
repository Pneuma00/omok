const socket = io('https://omok-ga.vercel.app:3000')

socket.emit('ping')
console.log('Ping?')

socket.on('pong', () => {
    console.log('Pong!')
})