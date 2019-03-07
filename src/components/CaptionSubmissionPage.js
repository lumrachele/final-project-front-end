import React, { Component } from 'react'
// import {addGameCaptions} from '../actions/addGameCaptions.js'
import {addGameCaption, statusVoting} from '../actions/allActions.js'
import InProgress from './inProgress.js'
// import SubmittedCaptionCounter from './SubmittedCaptionCounter.js'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Grid, Image, Header, Form, Label } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider'
import {API_URL} from '../constants/constants.js'


class CaptionSubmissionPage extends Component {
  state = {
    photo: "",
    currentInput: "",
    timer: null,
    counter: 45,
    showForm: true,
    showGoToVoting: false,
    clickedDone: false
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
      this.setState({
        showForm: false,
        showGoToVoting: true,
        clickedDone: true
      })
      clearInterval(this.state.timer);
    }
  }

  handleDone = () =>{
    this.setState({
      showForm: false,
      clickedDone: true
    })
  }

  componentDidMount(){
    // fetch(API_URL+`/user_games/1`)
    // .then(res=>res.json())
    // .then(userGame=>
    //   this.setState({
    //     photo: this.props.lastAddedPhoto
    //   })
    // )
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
    if(this.state.currentInput.length >= 3){
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
        // .then(gc=>this.props.addGameCaption(gc))
      })
    } else {
      alert("Your answer length must be at least 3 characters long.")
    }
  } // end of handleSubmit


  goToVoting=()=>{
    fetch(API_URL+`/voting`)
    .then(()=>this.props.statusVoting())
  }

  renderCaptionStage = ()=>{
    if(this.props.currentUser.isHost){
      return <InProgress />
    } else {
      return(
      <div className={"captionSubmissionPage"}>
        <Header size="huge">What do you think the original prompt was?</Header>
        <Header as="h2">You have <strong>{this.state.counter} s</strong> remaining.</Header>
          <Image centered src={this.props.lastAddedPhoto} alt={"hi"}/>

        { this.state.showForm &&
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
            <Form onSubmit={this.handleSubmit} style={{ maxWidth: 450 }} >
              <p size="large">Enter your submissions here!</p>
              <br></br>
              <input type="text" name="captionSubmission" onChange={this.handleChange}value={this.state.currentInput}/>
              <br></br>
              <br></br>
              <Button secondary>Submit Answer</Button>
            </Form>
            </Grid.Column>
          </Grid>
        }
          {this.state.showGoToVoting && <Button secondary onClick={this.goToVoting}>Go to Voting</Button>}
        <br></br>
        {this.props.submittedCaptions.length >= 3 && !this.state.clickedDone &&
          <Button onClick={this.handleDone}>Done</Button>
        }
        {this.state.clickedDone && <Header as="h3">Waiting for other players' submissions... </Header>}
      </div>)
    }
  }

  render(){
    return(
      <>
        {this.renderCaptionStage()}
      </>
    )
  }
}
//when time is up, hide form and show go to voting
const mapStateToProps = (state) =>{
  return state
}

export default connect(mapStateToProps, { addGameCaption, statusVoting })(withRouter(CaptionSubmissionPage))
