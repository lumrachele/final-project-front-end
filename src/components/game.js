import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import WebcamCapture from './WebcamCapture.js'
import InProgress from './inProgress.js'
import { connect } from 'react-redux'
import { Container, Header, Button, List, Image, Form, Label } from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider'

const Game = props =>{
  return(<>
    <Header as="h1">Game page</Header>

    <p>will render something different depending on if it is the  host or a  player</p>

    {
      props.currentUser.isHost
    ?
    <WebcamCapture />
    :
    <InProgress />
    }

    </>
  )
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps)(withRouter(Game))
