const socket = io()

socket.on('nickname', msg => {
    if (msg) alert(msg)

    socket.emit('join', prompt('닉네임을 입력해주세요 (최대 10자).'))
})

document.getElementById('participateButton').addEventListener('click', () => {
    socket.emit('participate')
})

// Chatting feature

const send = () => {
    if (document.getElementById('msgInput').value === '') return
    socket.emit('message', document.getElementById('msgInput').value)
    document.getElementById('msgInput').value = ''
}

document.getElementById('sendButton').addEventListener('click', send)

document.getElementById('msgInput').addEventListener('keydown', e => {
    if (e.code === 'Enter') send()
})

const chatArea = document.getElementById('chatArea')

socket.on('message', content => {
    chatArea.value += content + '\n'
    chatArea.scrollTop = chatArea.scrollHeight;
})

// Player list

const playerList = document.getElementById('playerList')

socket.on('playerListUpdate', players => { // PlayerManager
    playerList.innerText = Object.values(players).map(p => `${p.nickname} (${p.ip})`).join('\n')
})