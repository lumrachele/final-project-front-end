import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import WebcamCapture from './WebcamCapture.js'
import CaptionSubmissionPage from './CaptionSubmissionPage.js'
import SubmittedCaptionCounter from './SubmittedCaptionCounter.js'
import VotingPage from './VotingPage.js'
import Results from './Results.js'
import InProgress from './inProgress.js'
import { connect } from 'react-redux'
import { Container, Header, Button, List, Image, Form, Label } from 'semantic-ui-react'
import {statusCaptions, statusResults, getPhoto, addGameCaption, statusVoting, updateCurrentGame, anotherGame, replaceGC} from '../actions/allActions'
import { ActionCableConsumer } from 'react-actioncable-provider'
import {API_URL} from '../constants/constants.js'


const Game = props =>{
  const renderGameStage = () =>{
    switch(props.gameStatus){
      case "prompt":
        return props.currentUser.isHost ?
          <WebcamCapture/>
          :
          <InProgress />
      case "captions":
        return props.currentUser.isHost ?
              <>
                <InProgress />
                <SubmittedCaptionCounter/>
              </>

              :
              <>
              <CaptionSubmissionPage />
              <SubmittedCaptionCounter/>
              </>
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
      return props.statusCaptions()
    case 'GET_PHOTO':
      return props.getPhoto(data.photo)
    case 'ADDED_CAPTION':
      return props.addGameCaption(data.gameCaption)
    case 'GO_TO_VOTING':
      return props.statusVoting()
    // case 'GO_TO_RESULTS':
      // fetch(API_URL+`/games/${props.currentGame.id}`)
      // .then(res=>res.json())
      // .then(game=>{props.updateCurrentGame(game)})
      // .then(()=>props.statusResults())
      // return null
      // return props.statusResults()
    case 'RESULTS_WITH_ID':
      props.updateCurrentGame(data.game)
      return props.statusResults()
    case 'ADD_POINTS':
      return props.replaceGC(data.gameCaption)
    case 'RERENDER_GAME':
      return props.updateCurrentGame(data.game)
    case 'ANOTHER_GAME':
      props.anotherGame()
      return props.history.push('/home')
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

export default connect(mapStateToProps, {statusCaptions, statusResults, getPhoto, addGameCaption, statusVoting, updateCurrentGame, anotherGame, replaceGC})(withRouter(Game))
