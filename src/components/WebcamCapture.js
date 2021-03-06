import React, { Component } from 'react'
import Webcam from "react-webcam";
// import ReactDOM from 'react-dom'
import { statusCaptions, getPhoto } from '../actions/allActions'
import { connect } from 'react-redux'
// import { addPhoto } from '../actions/addPhoto'
import { withRouter } from 'react-router-dom'
import { Header, Button, Image } from 'semantic-ui-react'
import {API_URL} from '../constants/constants.js'

class WebcamCapture extends Component {
  state={
    pic:"",
    timer: null,
    counter: 5,
    showCounter: true
  };

  setRef = webcam => {
    this.webcam = webcam;
  };

  componentDidMount(){
    let timer = setInterval(this.decrement, 1000)
    this.setState({timer})
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
    else {
    this.capture()
    clearInterval(this.state.timer)
    this.setState({showCounter: false})
    }
  }


  capture = () => {
    const imageSrc = this.webcam.getScreenshot();

    fetch(API_URL+`/user_games/${this.props.hostUserGame.id}`, {method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({user_game: {
        imageUrl: imageSrc
        }
      })//end of stringify
    })//end of fetch
    .then(res=>res.json())
    .then(userGame => {
      this.setState({
        pic: userGame.imageUrl
      })
      this.props.getPhoto(userGame.imageUrl)
    })
  }

  download=(photo)=> {
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: this.state.pic,
      };
      // server sent the url to the file!
      // now, let's download:
      // window.location.href = response.file;
      // you could also do:
      window.open(response.file);
    }, 100);
  }

  getPic=()=>{
    return this.state.pic
  }

  goToCaptions = ()=>{
    fetch(API_URL+`/submissions`)
    .then(()=>{this.props.statusCaptions()})
    // .then(()=>this.props.history.push('/submitCaptions'))

  }

  render() {
    // const videoConstraints = {
    //   width: 1280,
    //   height: 720,
    //   facingMode: "user"
    // }
    return (
      <div>
{this.state.showCounter
  ?
  <>
  <Header as="H2">Your prompt:
  <br></br>
  {this.props.currentPrompt && this.props.currentPrompt.caption.text}</Header>

  <Header as="h3">{this.state.counter} seconds remaining</Header>

  <Webcam
    audio={false}
    ref={this.setRef}
    screenshotFormat="image/jpeg"
  />
  <br></br>

  </>
  :
  <Header as="h2">NICE! Send it to the Game Room 🤪</Header>


}
        {this.state.pic &&
          <>
            <Image centered src={this.state.pic} alt={"hi"}/>
            <br></br>
            <br></br>
            <Button color="orange" onClick={this.goToCaptions}>Dispatch Photo to Gameroom</Button>
            <br></br>
            <br></br>

            <a download target="_blank" href={this.state.pic}>download</a>
          </>
        }
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps, { getPhoto, statusCaptions })(withRouter(WebcamCapture))

// <Button color="orange" onClick={this.capture}>Capture photo</Button>
