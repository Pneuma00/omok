const playerList = new List('player-list', { valueNames: [ 'nickname' ] })

socket.on('join', player => {
    playerList.add({ nickname: player.nickname })
})