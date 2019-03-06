import React, { Component } from 'react'
// import {addGameCaptions} from '../actions/addGameCaptions.js'
// import InProgress from './inProgress.js'
// import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Grid, Image, Header, Form, Label } from 'semantic-ui-react'
// import { ActionCable } from 'react-actioncable-provider'
// import {API_URL} from '../constants/constants.js'


const SubmittedCaptionCounter = props => {
    return(
      <div className='counter'>
      <h1>Submissions: {props.submittedCaptions.length}</h1>
      </div>
    )
}

const mapStateToProps = (state) =>{
  return state
}

export default connect(mapStateToProps)(SubmittedCaptionCounter)
