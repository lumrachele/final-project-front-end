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
  // games: [],
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
  console.log('IN THE REDUCER', action.type);
  switch(action.type){
    case 'ADD_CURRENT_USER':
      return {
        ...state,
        currentUser: action.user,
      }
    case 'NEW_GAME':
      return {
        ...state,
        currentGame: {...action.game, users: []},
        currentPrompt: action.prompt,
        submittedCaptions:[...state.submittedCaptions, action.prompt],
        players: [...state.players, action.player]
      }
    // case 'PlAYER_JOIN':
    //   return {
    //     currentGame: action.game,
    //     currentPrompt
    //   }
    case 'UPDATE_ALL_GAMES':
      return {
        ...state,
        games: action.games
      }
    case 'ADD_PLAYERS':
      return {
        ...state,
        players: [...action.players]
      }
    case 'ADD_PLAYER_ON_JOIN':
      return{
        ...state,
        players: [...state.players, action.player]
      }
    case 'UPDATE_CURRENT_GAME':
      return{
        ...state,
        currentGame: action.game
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
