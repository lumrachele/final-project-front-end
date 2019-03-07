import React, { Component } from 'react';
// import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Header, Image } from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider'
import '../stylesheets/inProgress.css'

const InProgress = props =>{
  return(<>
    {
        props.currentUser.isHost
        ?

          <div className={"progress"}>
          <Header as="h1">Waiting for players...</Header>
          <Image centered src="loading.gif"/>
          </div>
          :
          <div className={"progress"}>
          <Header as="h1">It's the host's turn!</Header>
          <Image className={"loading"} centered src="https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-23.gif"/>
          </div>
      }
    </>
  )
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps)(InProgress)
