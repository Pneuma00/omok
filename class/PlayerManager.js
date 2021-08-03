class PlayerManager {
    
    constructor () {
        this.cache = {}
    }

    add (id, { nickname, ip }) {
        this.cache[id] = { nickname, ip }
    }

    remove (id) {
        delete this.cache[id]
    }

    get (id) {
        return this.cache[id]
    }
}

module.exports = PlayerManager