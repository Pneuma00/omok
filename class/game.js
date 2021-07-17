class Game {

    constructor () {
        this.board = Array(21).fill(null).map(() => Array(21).fill(-1))
    }

    start (black, white) {
        this.turn = 'black'
        this.black = black
        this.white = white
    }

    turn (raw, col) {
        
    }

}

module.exports = Game