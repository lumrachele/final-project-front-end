import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// import { myReducer } from './reducers/myReducer.js'
const API_URL = 'http://localhost:3000/api/v1/'

const defaultState = {
  photos: [],
  lastAddedPhoto: "",
  submittedCaptions: [],
}

const myReducer = (state = defaultState, action) =>{
  switch(action.type){
    case 'ADD_PHOTO':
      return {
        ...state,
        photos: [...state.photos, action.photo],
        lastAddedPhoto: action.photo
      }
    case 'ADD_CAPTION':
      return {
        ...state,
        submittedCaptions: [...state.submittedCaptions, action.caption]
      }
    default:
      return state
  }
}

const store = createStore(myReducer)

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
  , document.getElementById('root'));

serviceWorker.unregister();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
