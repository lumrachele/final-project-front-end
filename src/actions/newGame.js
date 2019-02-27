export const newGame = (game, prompt)=>{
  return{
    type: 'NEW_GAME',
    game: game,
    prompt: prompt
  }
}
