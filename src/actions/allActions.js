// when I make a new game, I need to update the following:
// post request - new game
// post request - new usergame
// get request - captions
  // randomly select
// post request - gameCaption

export const newGame = (game, prompt, user)=>{
  return{
    type: 'NEW_GAME',
    game: game,
    prompt: prompt,
    player: user
  }
}

export const addPlayers = (game)=>{
  return {type: 'ADD_PLAYERS',
  players: game.users
  }
}

export const addPlayerOnJoin = (user)=>{
  return {
    type: 'ADD_PLAYER_ON_JOIN',
    player: user
  }
}
//
// export const playerJoin = (game, prompt, user)=>{
//   return{
//     type: 'PlAYER_JOIN',
//     game: game,
//     prompt: game.user_games[0],
//     player: user
//   }
// }

export const updateAllGames = (games)=>{
  return{
    type: 'UPDATE_ALL_GAMES',
    games: games,
  }
}

export const updateCurrentGame = (game)=>{
  return{
    type: 'UPDATE_CURRENT_GAME',
    currentGame: game
  }
}



// - currentGame
// - current prompt
// - players
// - patch for this player - isHost: true
// - add prompt to submitted captions


// when a player joins a game, I need to update the following:
// - currentGame
// - current prompt - find this by the current game
// - players
// - add prompt to submitted captions



// when a game ends
