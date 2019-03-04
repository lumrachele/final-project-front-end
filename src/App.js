import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Header, Segment, Button } from 'semantic-ui-react'
import './stylesheets/App.css';
import WebcamCapture from './components/WebcamCapture'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
// import {withRouter} from 'react-router-dom'
import Login from './components/login.js'
import Home from './components/home.js'
import Home2 from './components/home2.js'
import CaptionSubmissionPage from './components/CaptionSubmissionPage.js'
import VotingPage from './components/VotingPage.js'
import Results from './components/Results.js'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { connect } from 'react-redux'
import { addPlayers, addPlayerOnJoin, updateCurrentGame } from './actions/allActions.js'
// import { getWaitingRoomPlayers } from './actions/getWaitingRoomPlayers.js'
import {API_URL} from './constants/constants.js'

// const API_URL = 'http://localhost:3000/api/v1'

class App extends Component {
  // state={
  //   photos:[],
  //   currentPhoto: ''
  // }

  renderPage=(page)=>{
  switch (page) {
      case 'login':
        return <Login />
      case 'home':
        return <>
                  <Segment clearing>
                  <Header as='h2' floated='right'>
                    <Button>Log Out</Button>
                  </Header>
                  </Segment>
                  <br></br>
                  <br></br>
                  <Home />
                </>
      case 'home2':
        return <>
                  <Segment clearing>
                  <Header as='h2' floated='right'>
                    <Button>Log Out</Button>
                  </Header>
                  </Segment>
                  <br></br>
                  <br></br>
                  <Home2 />
                </>
      case 'webcam':
        return <>
                  <Segment clearing>
                  <Header as='h2' floated='right'>
                    <Button> Log Out</Button>
                  </Header>
                  </Segment>
                  <br></br>
                  <br></br>
                  <WebcamCapture />
                </>
      case 'captions':
        return <>
                  <Segment clearing>
                  <Header as='h2' floated='right'>
                    <Button> Log Out</Button>
                  </Header>
                  </Segment>
                  <br></br>
                  <br></br>
                  <CaptionSubmissionPage />
                </>
      case 'voting':
        return <>
                  <Segment clearing>
                  <Header as='h2' floated='right'>
                    <Button> Log Out</Button>
                  </Header>
                  </Segment>
                  <br></br>
                  <br></br>
                  <VotingPage />
                </>
      case 'results':
        return <Results />
      default:
        return(<></>)
    }
  }

  handleReceived = (data)=>{
    // console.log("hi i received a connection", data)
    // this.props.getWaitingRoomPlayers(theObjKeyValuePair.game)
    switch (data.type){
      case 'ADD_PLAYERS':
      fetch(API_URL+`/games`)
      .then(res=>res.json())
      .then(games=>{
        // console.log("game:", game, "users:", game.users)
        this.props.updateCurrentGame(games[parseInt(games.length-1)])
        this.props.addPlayers(games[parseInt(games.length-1)])
        return games
      })
      .then(()=>{
        this.props.addPlayerOnJoin(data.player)

      })
      // debugger

    }

  }

  render() {
    return (
      <>
      <ActionCableConsumer
      channel={{channel: 'HomeChannel'}}
      onReceived={(data)=>{
        this.handleReceived(data)
      }}
       />
      <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={()=>this.renderPage('login')}/>
          <Route exact path={"/home"} component={()=>this.renderPage('home')}/>
          <Route exact path={"/home2"} component={()=>this.renderPage('home2')}/>
          <Route exact path={"/webcam"} component={()=>this.renderPage('webcam')}/>
          <Route exact path={"/submitCaptions"} component={()=>this.renderPage('captions')}/>
          <Route exact path={"/votingPage"} component={()=>this.renderPage('voting')}/>
          <Route exact path={"/results"} component={()=>this.renderPage('results')}/>
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

export default connect(null, { addPlayers, addPlayerOnJoin, updateCurrentGame})(App);
