import React, { Component } from 'react'
import Webcam from "react-webcam";
// import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { addPhoto } from '../actions/addPhoto'
import { withRouter } from 'react-router-dom'
import { Header, Button, Image } from 'semantic-ui-react'

const API_URL = 'http://localhost:3000/api/v1'

class WebcamCapture extends Component {
  state={
    pic:"",
    timer: null,
    counter: 5,
    captured: false
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
    else{
    // this.capture()
    // // this.clearInterval(this.state.timer);
    // this.setState({
    //   captured: true
    // })
    }
  }


  capture = () => {
    const imageSrc = this.webcam.getScreenshot();

    fetch(API_URL+`/user_games/${this.props.currentUserGame.id}`, {method: "PATCH",
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
      this.props.addPhoto(this.state.pic)
    })
  };

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

  goToSubmissions = ()=>{
    this.props.history.push('/submitCaptions')
  }


  render() {
    const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
}


    return (
      <div>
      <Header as="h2">
      {this.state.counter} s
      </Header>
        {this.state.pic ?
          <>
            <Image centered src={this.state.pic} alt={"hi"}/>
            <br></br>
            <br></br>
            <Button color="orange" onClick={this.goToSubmissions}>Dispatch Photo to Gameroom</Button>
            <br></br>
            <br></br>
            <a href={this.state.pic} title={this.props.currentPrompt.id} download target="_blank" rel="noopener noreferrer">
            Download photo</a>
          </>
          :
          <>
          <h2>Your prompt: <br></br>{this.props.currentPrompt && this.props.currentPrompt.caption.text}</h2>

          <Webcam
            audio={false}

            ref={this.setRef}
            screenshotFormat="image/jpeg"

            videoConstraints={videoConstraints}
          />
          <br></br>
          <Button color="orange" onClick={this.capture}>Capture photo</Button>
          </>
        }
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  console.log(state)
  return state
}
//
// const mapDispatchToProps = (dispatch)=>{
//   return{
//     addPhoto: ()=>{
//       dispatch(addPhoto())
//     }
//   }
// }

export default withRouter(connect(mapStateToProps, { addPhoto })(WebcamCapture))

// <Button onClick={this.download}>download photo</Button>


// </a>
