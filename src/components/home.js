import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

class Home extends Component{

  handleClick = ()=>{
    this.props.history.push('/webcam')
  }


  render(){
    return(
      <div>
      <h1>HOMEPAGE!</h1>
      <button onClick={this.handleClick}>START GAME!</button>
      </div>
    )
  }
}

export default withRouter(Home)
