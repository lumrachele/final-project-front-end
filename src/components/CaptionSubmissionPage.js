import React, { Component } from 'react'
import {addGameCaptions} from '../actions/addGameCaptions.js'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Grid, Image, Header, Form, Label } from 'semantic-ui-react'

// import CaptionContainer from './CaptionContainer'

const API_URL = 'http://localhost:3000/api/v1'


class CaptionSubmissionPage extends Component {
  state = {
    photo: "",
    currentInput: "",
    timer: null,
    counter: 20,
  }


  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  decrement=()=>{
    if (this.state.counter > 0){
      this.setState({
        counter: this.state.counter - 1
      })
    }
    else{
    // this.capture()
    // // this.clearInterval(this.state.timer);
    // this.setState({
    //   captured: true
    // })
    }
  }



  componentDidMount(){
    fetch(API_URL+`/user_games/1`)
    .then(res=>res.json())
    .then(userGame=>
      this.setState({
        photo: this.props.lastAddedPhoto
      })
    )
    let timer = setInterval(this.decrement, 1000)
    this.setState({timer})
  }


  handleChange = (event)=>{
    this.setState({
      currentInput: event.target.value
    })
  }

  handleSubmit=(event)=>{
    event.preventDefault()
    if(this.state.currentInput.length > 4){
      fetch(API_URL+`/captions`, {method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          caption:{
            text: this.state.currentInput,
            user_id: this.props.currentUser.id
          }
        })
      })
      .then(res=>res.json())
      .then(caption=>{
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
            game_id: this.props.currentGame.id
          })
        })
        .then(res=>res.json())
        .then(gc=>this.props.addGameCaptions(gc))
      })
    } else {
      alert("Your answer length must be greater than 3 characters.")
    }

    //want to dispatch an action addGameCaptions
  } // end of handleSubmit


  handleClick=()=>{
    this.props.history.push('/votingPage')
  }

  render(){
    return(
      <div className={"captionSubmissionPage"}>
      <Header size="huge">What do you think the original prompt was?</Header>
      <Header as="h2">You have <strong>
        {this.state.counter} s</strong> remaining.</Header>

      {this.state.photo &&
        <Image centered src={this.state.photo} alt={"hi"}/>
      }
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
        <Form onSubmit={this.handleSubmit} style={{ maxWidth: 450 }} >
          <Label size="large">Enter your submissions here!</Label>
          <br></br>
          <input type="text" name="captionSubmission" onChange={this.handleChange}value={this.state.currentInput}/>
          <br></br>
          <br></br>
          <Button secondary>Submit Answer</Button>
        </Form>
        </Grid.Column>
      </Grid>
        <br></br>
        {this.props.submittedCaptions.length >= 3 &&
          <Button color="orange" onClick={this.handleClick}>Go to Voting</Button>
        }
      </div>
    )
  }
}

//when time is up, hide form and show go to voting

const mapStateToProps = (state) =>{
  return state
}

// const mapDispatchToProps = (dispatch)=>{
//   return {addGameCaptions: ()=>{
//     dispatch(addGameCaptions())
//   }}
// }


export default connect(mapStateToProps, { addGameCaptions })(withRouter(CaptionSubmissionPage))

// <CaptionContainer/>
