import React, { Component } from 'react'
import Webcam from "react-webcam";
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { addPhoto } from '../actions/addPhoto'
import { withRouter } from 'react-router-dom'
const API_URL = 'http://localhost:3000/api/v1'

class WebcamCapture extends React.Component {
  state={
    pic:""
  }
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();

    fetch(API_URL+`/user_games/1`, {method: "PATCH",
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
};


    return (
      <div>
        {this.state.pic ?
          <>
            <img src={this.state.pic} alt={"hi"}/>
            <br></br>
            <button onClick={this.download}>download photo</button>
            <br></br>
            <button onClick={this.goToSubmissions}>Dispatch Photo to Gameroom</button>
          </>
          :
          <>
          <Webcam
            audio={false}

            ref={this.setRef}
            screenshotFormat="image/jpeg"

            videoConstraints={videoConstraints}
          />
          <br></br>
          <button onClick={this.capture}>Capture photo</button>
          </>
        }
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  console.log()
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

// <a href={this.state.pic} title="hello" download>
// Download photo
// </a>
