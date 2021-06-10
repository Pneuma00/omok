const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

io.on('connection', socket => {
    const id = socket.id
    const ip = socket.handshake.address.address

    socket.on('ping', () => {
        socket.emit('pong')
    })
})

http.listen(process.env.PORT || 3000)