class Player {

    constructor ({ nickname, id, ip }) {
        this.nickname = nickname || `ㅇㅇ`
        this.id = id
        this.ip = ip
    }

    setNickname (nickname) {
        this.nickname = nickname
    }

    getNickname () {
        return this.nickname
    }

    getIP () {
        return this.ip
    }
}

module.exports = Player