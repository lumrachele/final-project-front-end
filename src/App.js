import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Camera from './Camera'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import WebcamCapture from './WebcamCapture'
import Webcam from "react-webcam";

class App extends Component {
  state={
    photos:[],
    currentPhoto: ''
  }
  //
  // onTakePhoto (dataUri) {
  //   // Do stuff with the dataUri photo...
  //   console.log('takePhoto');
  //   this.setState({
  //     currentPhoto: dataUri
  //   }, this.download(dataUri))
  //
  //
  // }
//
//   download(photo) {
//   // fake server request, getting the file url as response
//   setTimeout(() => {
//     const response = {
//       file: photo,
//     };
//     // server sent the url to the file!
//     // now, let's download:
//     window.location.href = response.file;
//     // you could also do:
//     // window.open(response.file);
//   }, 100);
// }


  render() {
    return (
      <div className="App">
        <WebcamCapture/>
      </div>
    );
  }
}

export default App;

// <Camera
// onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
// />
