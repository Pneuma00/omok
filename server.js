const express = require('express')
const app = express()
const http = require('http').createServer(app)

app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

http.listen(process.env.PORT || 3000, () => {
    console.log(`Listening to port ${process.env.PORT || 3000}`)
})

// =========================================================================

const io = require('socket.io')(http)

let white = false

io.on('connection', socket => {
    const id = socket.id
    const ip = socket.handshake.address.slice(7)
    let nickname = id

    console.log(socket.handshake)

    console.log(`A user connected (ID: ${id}, IP: ${ip})`)

    socket.on('disconnect', () => {
        console.log(`User disconnected (ID: ${id}, IP: ${ip})`)
        io.emit('message', { content: `${nickname} 이(가) 퇴장했습니다.`, system: true })
    })

    socket.on('ping', () => {
        socket.emit('pong')
    })

    socket.on('join', name => {
        nickname = name
        io.emit('message', { content: `${nickname} 이(가) 접속했습니다.`, system: true })
    })

    socket.on('message', msg => {
        if (typeof msg !== 'string') return

        io.emit('message', { content: msg, player: `${nickname}(${ip})` })
    })

    socket.on('turn', data => {
        data.color = white ? 'white' : 'black'
        io.emit('turn', data)
        white = !white
    })
})