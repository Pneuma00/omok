class Game {

    constructor () {
        this.board = Array(21).fill(null).map(() => Array(21).fill(null))
        
        this.blackId = ''
        this.whiteId = ''

        this.turnCount = 0

        this.turnPlayer = 'black' // or 'white'
    }

    start (blackId, whiteId) {
        this.board = Array(21).fill(null).map(() => Array(21).fill(null))

        this.blackId = blackId
        this.whiteId = whiteId
        this.turnCount = 0
        this.turnPlayer = 'black'
        
        console.log(`Created a new game (Black: ${blackId}, White: ${whiteId})`)
    
        this.turn(10, 10)
    }

    get (row, column) {
        if (row < 0 || row > 20 || column < 0 || column > 20) return null
        return this.board[row][column]
    }

    turn (row, column) {
        this.board[row][column] = this.turnPlayer

        const directions = [
            { row: -1, col: 0 },
            { row: -1, col: 1 },
            { row: 0, col: 1 },
            { row: 1, col: 1 },
            { row: 1, col: 0 },
            { row: 1, col: -1 },
            { row: 0, col: -1 },
            { row: -1, col: -1 },
        ]

        for (let d of directions) {
            let isFiveInRow = false

            for (let begin = -4; begin <= 0; begin++) {
                let check = true

                if (this.get(row + d.row * (begin - 1), column + d.col * (begin - 1)) === this.turnPlayer
                    || this.get(row + d.row * (begin + 5), column + d.col * (begin + 5)) === this.turnPlayer) check = false

                for (let i = 0; i <= 4; i++) {
                    if (this.get(row + d.row * (begin + i), column + d.col * (begin + i)) !== this.turnPlayer) check = false
                }

                if (check) isFiveInRow = true
            }

            if (isFiveInRow) return true // 해야할것. 배열 잘못된 인덱스 예외해결
        }

        if (this.turnPlayer === 'black') this.turnPlayer = 'white'
        else this.turnPlayer = 'black'
    }
}

module.exports = Game