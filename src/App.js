import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Header, Segment, Button } from 'semantic-ui-react'
import './stylesheets/App.css';
// import WebcamCapture from './components/WebcamCapture'
import Game from './components/game'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Login from './components/login.js'
import Home from './components/home.js'
import CaptionSubmissionPage from './components/CaptionSubmissionPage.js'
import VotingPage from './components/VotingPage.js'
import Results from './components/Results.js'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { connect } from 'react-redux'
import { addPlayers, updateCurrentGame } from './actions/allActions.js'
import {API_URL} from './constants/constants.js'


class App extends Component {

  renderPage=(page)=>{
  switch (page) {
      case 'login':
        return <Login />
      case 'home':
        return <>
                  <br></br>
                  <br></br>
                  <Home/>
                </>
      //eventually want this to be referring to the gameChannel, /games/:game_id
      case 'game':
        return <>
                  <br></br>
                  <br></br>
                  <Game/>
                </>

      default:
        return(<></>)
    }
  }


  render() {
    return (
      <>
      <Router>
      <div className="App">

        <Switch>
          <Route exact path={"/"} component={()=>this.renderPage('login')}/>
          <Route exact path={"/home"} component={()=>this.renderPage('home')}/>
          <Route exact path={"/game"} component={()=>this.renderPage('game')}/>
        </Switch>

        </div>
      </Router>
      </>
    );
  }
}
//
// const mapStateToProps = (state)=>{
//   return state
// }

export default connect(null, { addPlayers, updateCurrentGame})(App);
