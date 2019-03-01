export const addPlayerToExistingGame = (user, game)=>{
  return{
    type: 'ADD_PLAYER_TO_EXISTING_GAME',
    player: user,
    currentGame: game
  }
}
//updates currentUser upon sign in
