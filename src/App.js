import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Header, Segment, Button } from 'semantic-ui-react'
import './stylesheets/App.css';
import WebcamCapture from './components/WebcamCapture'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
// import {withRouter} from 'react-router-dom'
import Login from './components/login.js'
import Home from './components/home.js'
import CaptionSubmissionPage from './components/CaptionSubmissionPage.js'
import VotingPage from './components/VotingPage.js'
import Results from './components/Results.js'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { connect } from 'react-redux'
import { getWaitingRoomPlayers } from './actions/getWaitingRoomPlayers.js'

// const API_URL = 'http://localhost:3000/api/v1'

class App extends Component {
  state={
    photos:[],
    currentPhoto: ''
  }

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

  handleReceived = (theObjKeyValuePair)=>{
    console.log("i hope this is the game:", theObjKeyValuePair.game)
    this.props.getWaitingRoomPlayers(theObjKeyValuePair.game)


  }

  render() {
    return (
      <>
      <ActionCableConsumer
      channel={{channel: 'HomeChannel'}}
      onReceived={(theObjImReceiving)=>{
        this.handleReceived(theObjImReceiving)
      }}
       />
      <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={()=>this.renderPage('login')}/>
          <Route exact path={"/home"} component={()=>this.renderPage('home')}/>
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

export default connect(null, {getWaitingRoomPlayers})(App);
