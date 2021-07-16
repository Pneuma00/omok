class Game {

    constructor () {
        this.ingame = false
        this.board = Array(21).fill(null).map(() => Array(21).fill(-1))
    }

    start (black, white) {
        this.ingame = true
        this.turn = 'black'
        this.black = black
        this.white = white
    }

    turn (id, ) {

    }
}

module.exports = Game