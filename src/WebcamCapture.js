import React from 'react'
import Webcam from "react-webcam";

export default class WebcamCapture extends React.Component {
  state={
    pic:""
  }
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.download(imageSrc)
    this.setState({
      photo: imageSrc
    })
  };



  download=(photo)=> {
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: photo,
      };
      // server sent the url to the file!
      // now, let's download:
      window.location.href = response.file;
      // you could also do:
      // window.open(response.file);
    }, 100);
  }

  getPic=()=>{
    return this.state.pic
  }

  render() {
    const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};


    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
        <image src={this.getPic()}/>
      </div>
    )
  }
}
