// when I make a new game, I need to update the following:
// post request - new game
// post request - new usergame
// get request - captions
  // randomly select
// post request - gameCaption

export const init = ()=>{
  return{
    type: '@@INIT'
  }
}


export const addCurrentUser = (user)=>{
  return{
    type: 'ADD_CURRENT_USER',
    user: user
  }
}

export const newUser = (user)=>{
  return{
    type: 'NEW_GAME',
    user: user
  }
}

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

// export const addPlayerOnJoin = (user)=>{
//   return {
//     type: 'ADD_PLAYER_ON_JOIN',
//     player: user
//   }
// }
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
    currentGame: game,
    submittedCaptions: game.game_captions
  }
}

export const addHostUserGame = (ug)=>{
  return{
    type: 'ADD_HOST_USER_GAME',
    usergame: ug
  }
}

export const statusCaptions = ()=>{
  return {type: 'STATUS_CAPTIONS'}
}

export const statusVoting = ()=>{
  return {type: 'STATUS_VOTING'}
}

export const statusResults = ()=>{
  return {type: 'STATUS_RESULTS'}
}

export const getPhoto = (ugPhoto)=>{
   return {
     type: 'GET_PHOTO',
     photo: ugPhoto
    }
}

export const addGameCaption = (gameCaption)=>{
  return{
    type: 'ADD_GAME_CAPTION',
    gameCaption: gameCaption
  }
}
export const replaceGC = (gc)=>{
  return{
    type: 'REPLACE_GC',
    gameCaption: gc
  }
}

export const anotherGame = ()=>{
  return{
    type: 'ANOTHER_GAME'
  }
}

export const logout = ()=>{
  return{
    type: 'LOGOUT'
  }
}


// export const addPromptToSubmitted = ()=>{
//
// }


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
