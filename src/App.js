import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import WebcamCapture from './components/WebcamCapture'
import Webcam from "react-webcam";
import { createStore } from "redux"
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from "react-router-dom"
import {withRouter} from 'react-router-dom'
import Home from './components/home.js'
import CaptionSubmissionPage from './components/CaptionSubmissionPage.js'
import VotingPage from './components/VotingPage.js'
import Results from './components/Results.js'

const API_URL = 'http://localhost:3000/api/v1'

class App extends Component {
  state={
    photos:[],
    currentPhoto: ''
  }

  // renderHomePage=()=>{
  //   return (
  //     <>
  //       <Home />
  //     </>
  //   )
  // }
  //
  // renderWebcam = ()=>{
  //   return(
  //     <>
  //     <WebcamCapture/>
  //     </>
  //   )
  // }
  //
  // renderCaptionSubmissionPage = ()=>{
  //   return(
  //     <>
  //       <CaptionSubmissionPage/>
  //     </>
  //   )
  // }
  //
  // renderVotingPage = ()=>{
  //   return(
  //     <>
  //       <VotingPage/>
  //     </>
  //   )
  // }

  renderPage=(page)=>{
  switch (page) {
      case 'home':
        return <Home />
      case 'webcam':
        return <WebcamCapture />
      case 'captions':
        return <CaptionSubmissionPage />
      case 'voting':
        return <VotingPage />
      case 'results':
        return <Results />
      default:
        return(<></>)
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
        <Switch>
          <Route exact path={"/"} component={()=>this.renderPage('home')}/>
          <Route exact path={"/webcam"} component={()=>this.renderPage('webcam')}/>
          <Route exact path={"/submitCaptions"} component={()=>this.renderPage('captions')}/>
          <Route exact path={"/votingPage"} component={()=>this.renderPage('voting')}/>
          <Route exact path={"/results"} component={()=>this.renderPage('results')}/>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

// <Camera
// onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
// />
