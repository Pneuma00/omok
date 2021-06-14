const socket = io()

const nickname = prompt('닉네임을 입력해주세요.')
socket.emit('join', nickname)

socket.emit('ping')
console.log('Ping?')

socket.on('pong', () => {
    console.log('Pong!')
})