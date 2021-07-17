const Player = require('./Player')

class PlayerManager {
    
    constructor () {
        this.list = []
    }

    add ({ nickname, id, ip }) {
        this.list.append(new Player({ nickname, id, ip }))
    }

    remove ({ id }) {
        this.list.splice(this.list.findIndex(p => p.id === id), 1)
    }

    get ({ id }) {
        this.list.find(p => p.id === id)
    }
}

module.exports = PlayerManager