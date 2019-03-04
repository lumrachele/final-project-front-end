// const defaultState = {
//   photos: [],
//   lastAddedPhoto: ""
// }
//
// export default function myReducer(state = defaultState, action) {
//   switch(action.type){
//     case 'ADD_PHOTO':
//       return {
//         ...state,
//         photos: [...state.photos, action.photo],
//         lastAddedPhoto: action.photo
//       }
//     default:
//       return state
//   }
// }
//


const myReducer = (state = defaultState, action) =>{
  console.log('IN THE REDUCER', action.type);
  switch(action.type){
    case 'ADD_CURRENT_USER':
      return {
        ...state,
        currentUser: action.user,
        // players: [...state.players, action.user]
      }
    case 'ADD_USER_GAME':
      return {
        ...state,
        players: [...state.players, action.player],
        currentUserGame: action.usergame,
      }
    case 'PLAYER_JOIN':
    return{
      ...state,
      // players: [...state.players, action.player],
      // currentGame: {...action.currentGame, users: []},
      currentGame: action.currentGame,
      currentPrompt: action.currentPrompt,
      submittedCaptions:[...state.submittedCaptions, action.currentPrompt]
    }
    case 'ADD_PHOTO':
      return {
        ...state,
        photos: [...state.photos, action.photo],
        lastAddedPhoto: action.photo
      }
    case 'ADD_GAME_CAPTION':
      return {
        ...state,
        submittedCaptions: [...state.submittedCaptions, action.gameCaption]
      }
    case 'NEW_GAME':
      return {
        ...state,
        currentGame: action.game,
        currentPrompt: action.prompt,
        submittedCaptions:[...state.submittedCaptions, action.prompt]
      }
    case 'ANOTHER_GAME':
      return {...state,
        currentGame: null,
        currentPrompt: null,
        currentUserGame: "",
        photos: [],
        lastAddedPhoto: "",
        submittedCaptions: [],
      }
    case 'GET_WAITING_ROOM_PLAYERS':
    console.log('ARE WE HERE?');
    console.log({ action });
      return{...state,
      currentGame: action.game
      }
    default:
      return state
  }
}
