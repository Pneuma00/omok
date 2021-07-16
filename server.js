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
const Game = require('./class/game')
const Player = require('./class/player')

const game = new Game()

io.on('connection', socket => {
    const id = socket.id
    const ip = socket.handshake.address.slice(7)

    console.log(`A user connected (ID: ${id}, IP: ${ip})`)

    const player = new Player({ id, ip: ip.split('.').slice(0, 2).join('.') })

    socket.on('join', name => {
        player.setNickname(name)
        io.emit('join', player)
        io.emit('message', { content: `[+] ${player.nickname}(${player.ip}) 이(가) 접속했습니다.` })
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected (ID: ${id}, IP: ${ip})`)
        io.emit('leave', player)
        io.emit('message', { content: `[-] ${player.nickname}(${player.ip}) 이(가) 퇴장했습니다.` })
    })

    socket.on('message', msg => {
        if (typeof msg !== 'string') return

        io.emit('message', { content: msg, sender: player.nickname })
    })

    socket.on('participate', () => {
        io.emit('message', { content: `${player.nickname}(${player.ip}) 이(가) 게임에 참가합니다.` })
    })

    socket.on('turn', data => {
        // io.emit('turn', data)
    })
})