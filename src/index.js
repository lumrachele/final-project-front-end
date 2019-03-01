import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import 'semantic-ui-css/semantic.min.css'
import { ActionCableProvider } from 'react-actioncable-provider'


const defaultState = {
  games: [],
  players: [],
  currentUser: null,
  currentGame: null,
  currentPrompt: null,
  currentUserGame: "",
  photos: [],
  lastAddedPhoto: "",
  submittedCaptions: [],
}

const myReducer = (state = defaultState, action) =>{
  switch(action.type){
    case 'ADD_CURRENT_USER':
      return {
        ...state,
        currentUser: action.user,
        players: [...state.players, action.user]
      }
    case 'ADD_USER_GAME':
      return {
        ...state,
        currentUserGame: action.usergame,
      }
    case 'ADD_PLAYER_TO_EXISTING_GAME':
    return{
      ...state,
      players: [...state.players, action.player],
      currentGame: action.currentGame
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
        //this is a usergame
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
    default:
      return state
  }
}

const store = createStore(myReducer)

store.subscribe(()=> {
  console.log("current state:", store.getState())

  console.log("-------------------")
})

ReactDOM.render(
  <ActionCableProvider url="ws://localhost:3000/api/v1/cable">
      <Provider store={store}>
        <App />
      </Provider>
    </ActionCableProvider>
  , document.getElementById('root'));

serviceWorker.unregister();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
