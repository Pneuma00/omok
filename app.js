const express = require('express')
const app = express()
const http = require('http').createServer(app)

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

http.listen(process.env.PORT || 3000, () => {
    console.log(`Listening to port ${process.env.PORT || 3000}`)
})

// =========================================================================

const io = require('socket.io')(http)

const Game = new (require('./class/Game'))()
const PlayerManager = new (require('./class/PlayerManager'))()

const participateQueue = []

let isIngame = false

io.on('connection', socket => {
    const id = socket.id
    const fullIp = socket.handshake.address.slice(7)
    const ip = fullIp.split('.', 2).join('.')

    let nickname = 'ㅇㅇ'
    let isJoined = false

    console.log(`A socket connected (ID: ${id}, IP: ${fullIp})`)

    socket.emit('nickname')

    socket.on('join', name => {
        if (isJoined) return
        if (typeof name !== 'string' || name === '' || name.length > 10) return socket.emit('nickname', '올바르지 않은 닉네임입니다.')

        nickname = name
        isJoined = true
        PlayerManager.add(id, { nickname, ip })

        console.log(`User joined (Nickname: ${nickname}, ID: ${id})`)
        io.emit('playerListUpdate', PlayerManager.cache)
        io.emit('message', `[+] ${nickname}(${ip}) 이(가) 접속했습니다.`)
    })

    socket.on('disconnect', () => {
        console.log(`User left (Nickname: ${nickname}, ID: ${id})`)
        console.log(`Socket disconnected (ID: ${id}, IP: ${fullIp})`)

        PlayerManager.remove(id)

        io.emit('leave', { nickname, ip })
        io.emit('playerListUpdate', PlayerManager.cache)
        io.emit('message', `[-] ${nickname}(${ip}) 이(가) 퇴장했습니다.`)
    })

    socket.on('message', msg => {
        if (typeof msg !== 'string') return

        console.log(`${nickname}(${ip}): ${msg})`)
        io.emit('message', `${nickname}(${ip}): ${msg}`)
    })

    socket.on('participate', () => {
        if (isIngame) return socket.emit('message', '이미 게임이 진행중입니다.')

        if (participateQueue.includes(id)) return socket.emit('message', '이미 참가하였습니다.')

        participateQueue.push(id)

        console.log(`${id} participated to game`)
        io.emit('message', `${nickname}(${ip}) 이(가) 오목에 참가합니다.`)
        
        if (participateQueue.length === 2) {
            Game.start(participateQueue[0], participateQueue[1])
            participateQueue.splice(0, participateQueue.length)
            isIngame = true

            io.emit('gameStart')
            io.emit('message', `게임이 시작됩니다 (흑: ${PlayerManager.get(Game.blackId).nickname}, 백: ${PlayerManager.get(Game.whiteId).nickname})`)
        }
    })

    socket.on('turn', (row, column) => {
        if (!isIngame) return socket.emit('message', '게임이 진행 중이 아닙니다.')

        const turnPlayer = Game.turnPlayer

        if (id !== Game[turnPlayer + 'Id']) return socket.emit('message', '차례가 아닙니다.')

        if (Game.get(row, column) !== null) return socket.emit('message', '이미 돌이 놓인 곳입니다.')

        if (Game.turn(row, column)) {
            io.emit('message', `게임이 끝났습니다! 승자는 ${PlayerManager.get(Game[turnPlayer + 'Id']).nickname}`)
            isIngame = false
        }

        io.emit('turn', row, column, turnPlayer)
    })
})