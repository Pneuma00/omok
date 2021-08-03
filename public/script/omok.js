const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')

let board = Array(19 + 2).fill(null).map(() => Array(19 + 2).fill(0))
let cursor = { x: 0, y: 0 }

const grid = 30

const getMousePosition = evt => {
    let rect = canvas.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top }
}

CanvasRenderingContext2D.prototype.fillCircle = function (x, y, r) {
    this.beginPath()
    this.arc(x, y, r, 0, 2 * Math.PI, false)
    this.fill()
}

canvas.addEventListener('click', evt => {
    const pos = getMousePosition(evt)
    console.log(`Clicked ${pos.x}, ${pos.y}`)

    let x = Math.round(pos.x / grid), y = Math.round(pos.y / grid)

    if (x < 1 || y < 1 || x > 19 || y > 19) return

    socket.emit('turn', y, x)
    console.log(`Emitted turn event on row ${y}, column ${x}`)
})

canvas.addEventListener('mousemove', evt => {
    const pos = getMousePosition(evt)
    let x = Math.round(pos.x / grid), y = Math.round(pos.y / grid)
    
    if (x < 1 || y < 1 || x > 19 || y > 19) return
    cursor = { x, y }

    update()
})

socket.on('turn', (row, column, turnPlayer) => {
    board[row][column] = turnPlayer
    update()
})

socket.on('gameStart', () => {
    board = Array(19 + 2).fill(null).map(() => Array(19 + 2).fill(0))
    update()
})

const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#ddbb66'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#000000'
    for (let i = 1; i <= 19; i++) {
        ctx.fillRect(i * grid, grid, 1, canvas.height - grid * 2)
    }

    for (let i = 1; i <= 19; i++) {
        ctx.fillRect(grid, i * grid, canvas.width - grid * 2, 1)
    }

    for (let row = 1; row <= 19; row++) {
        for (let col = 1; col <= 19; col++) {
            if (board[row][col] === 0) continue
            if (board[row][col] === 'white') {
                ctx.fillStyle = 'white'
                ctx.fillCircle(col * grid, row * grid, 10)
            }
            if (board[row][col] === 'black') {
                ctx.fillStyle = 'black'
                ctx.fillCircle(col * grid, row * grid, 10)
            }
        }
    }
    ctx.fillStyle = 'red'
    ctx.fillRect(cursor.x * grid - 5, cursor.y * grid - 5, 10, 10)
}

update()