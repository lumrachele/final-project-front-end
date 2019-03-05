import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import WebcamCapture from './WebcamCapture.js'
import CaptionSubmissionPage from './CaptionSubmissionPage.js'
import VotingPage from './VotingPage.js'
import Results from './Results.js'
import InProgress from './inProgress.js'
import { connect } from 'react-redux'
import { Container, Header, Button, List, Image, Form, Label } from 'semantic-ui-react'
import {statusCaptions, getPhoto} from '../actions/allActions'
import { ActionCableConsumer } from 'react-actioncable-provider'

const Game = props =>{
  console.log(props)
  const renderGameStage = () =>{
    switch(props.gameStatus){
      case "prompt":
        return props.currentUser.isHost ?
          <>   <WebcamCapture gameHandleReceived={gameHandleReceived} /></>
          :
          <InProgress />
      case "captions":
        return props.currentUser.isHost ?
              <InProgress />
              :
              <CaptionSubmissionPage />
      case "voting":
        return props.currentUser.isHost ?
              <InProgress />
              :
              <VotingPage />
      case "results":
      return  <Results />
    }
}


  const gameHandleReceived = (data)=>{
    console.log("in gameHandleReceived", data)
    switch(data.type){
    case 'GAME_HAS_BEEN_STARTED':
      return props.history.push('/game')
    case 'GO_TO_SUBMISSIONS':
      console.log("hit sub from game page", data)
      // this.props.history.push('/submitCaptions')
      props.statusCaptions()
      break;
    case 'GET_PHOTO':
      props.getPhoto(data.photo)
    default:
      return null
          // here is where I am going to change the route?
    }
  }

  return(<>
    <ActionCableConsumer
    channel={{channel: 'HomeChannel'}}
    onReceived={(data)=>{
      gameHandleReceived(data)
    }}
    />
    {renderGameStage()}
    </>
  )
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps, {statusCaptions, getPhoto})(withRouter(Game))
