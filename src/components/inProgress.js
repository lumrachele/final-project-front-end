import React, { Component } from 'react';
// import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Header, Button, List, Image, Form, Label } from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider'

const InProgress = props =>{
  return(
    <Header as="h1">In Progress Page</Header>
  )
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps)(InProgress)
