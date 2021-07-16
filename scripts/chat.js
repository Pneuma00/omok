document.getElementById('sendButton').addEventListener('click', () => {
    socket.emit('message', document.getElementById('msgInput').value)
})

socket.on('message', ({ content, sender }) => {
    document.getElementById('chatArea').value += (sender ? `${sender.nickname}(${sender.ip}): ` : '') + content + '\n'
})