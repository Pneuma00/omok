console.log('chat.js loaded')

document.getElementById('sendButton').addEventListener('click', () => {
    socket.emit('message', document.getElementById('msgInput').value)
})

socket.on('message', msg => {
    document.getElementById('chatArea').value += `${msg.system ? '' : msg.player + ': '}${msg.content}\n`
})