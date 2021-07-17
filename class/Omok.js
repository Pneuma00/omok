const Game = require("./Game")
const PlayerManager = require("./playerManager")

class Omok {

    constructor () {
        this.players = new PlayerManager()
        this.game = new Game()

        this.isIngame = false
    }

    createGame () {
        const game = new Game()
        this.isIngame = true
    }
}

module.exports = Omok