const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')

let board = Array(19 + 2).fill(null).map(() => Array(19 + 2).fill(0))
let cursor = { x: 0, y: 0 }

const grid = 31.25

const getMousePosition = evt => {
    let rect = canvas.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top }
}

canvas.addEventListener('click', evt => {
    const pos = getMousePosition(evt)
    console.log(`Clicked ${pos.x}, ${pos.y}`)

    let x = Math.round(pos.x / grid), y = Math.round(pos.y / grid)
    socket.emit('turn', { x, y })
    console.log(`Emitted turn event on ${x}, ${y}`)
})

canvas.addEventListener('mousemove', evt => {
    const pos = getMousePosition(evt)
    let x = Math.round(pos.x / grid), y = Math.round(pos.y / grid)
    cursor = { x, y }
})

socket.on('turn', data => {
    board[data.x][data.y] = data.color
})

setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 1; i <= 19; i++) {
        for (let j = 1; j <= 19; j++) {
            if (board[i][j] === 0) continue
            if (board[i][j] === 'white') {
                ctx.fillStyle = 'white'
                ctx.fillRect(i * grid - 10, j * grid - 10, 20, 20)
            }
            if (board[i][j] === 'black') {
                ctx.fillStyle = 'black'
                ctx.fillRect(i * grid - 10, j * grid - 10, 20, 20)
            }
        }
    }
    ctx.fillRect(cursor.x * grid - 5, cursor.y * grid - 5, 10, 10)
}, 10)