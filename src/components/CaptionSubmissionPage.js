import React, { Component } from 'react'
import {addCaptions} from '../actions/addCaptions.js'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

import CaptionContainer from './CaptionContainer'

const API_URL = 'http://localhost:3000/api/v1'


class CaptionSubmissionPage extends Component {
  state = {
    photo: "",
    currentInput: ""
  }


  componentDidMount(){
    fetch(API_URL+`/user_games/1`)
    .then(res=>res.json())
    .then(userGame=>
      this.setState({
        photo: userGame.imageUrl
      })
    )
  }


  handleChange = (event)=>{
    this.setState({
      currentInput: event.target.value
    })
  }

  handleSubmit=(event)=>{
    event.preventDefault()
    fetch(API_URL+`/captions`, {method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        caption:{
          text: this.state.currentInput,
          user_id: 2
        }
      })
    })
    .then(res=>res.json())
    .then(caption=>{
      this.props.addCaptions(caption)
      this.setState({
        currentInput: ""
      })
      //create game caption so that points can be added
      fetch(API_URL+`/game_captions`, {method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          caption_id: caption.id,
          game_id: 1
        })
      })
      .then(res=>res.json())
      .then(gc=>console.log(gc))
    })

    //want to dispatch an action addCaptions
  } // end of handleSubmit


  handleClick=()=>{
    this.props.history.push('/votingPage')
  }

  render(){
    return(
      <div className={"captionSubmissionPage"}>
      <h1>Submit Your Prompts!</h1>
      <h3>What do you think the original prompt was?</h3>
      <h3>You have <strong>this much</strong> time remaining.</h3>

      {this.state.photo ?
        <img src={this.state.photo} alt={"hi"}/>
:
      <img src={"https://thenypost.files.wordpress.com/2017/06/unnamed2.jpg?quality=90&strip=all&w=618&h=410&crop=1"} alt={"defaultImage"}/>

      }

        <form onSubmit={this.handleSubmit}>
          <label>Enter your submissions here!</label>
          <br></br>
          <input type="text" name="captionSubmission" onChange={this.handleChange}value={this.state.currentInput}/>
        </form>

        <button onClick={this.handleClick}>Go to Voting</button>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {lastAddedPhoto: state.lastAddedPhoto,
    submittedCaptions: state.submittedCaptions
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {addCaptions: ()=>{
    dispatch(addCaptions())
  }}
}


export default connect(mapStateToProps, { addCaptions })(withRouter(CaptionSubmissionPage))

// <CaptionContainer/>
