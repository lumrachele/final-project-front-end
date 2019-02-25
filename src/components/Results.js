import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {init} from '../actions/init.js'
const API_URL = 'http://localhost:3000/api/v1'
class Results extends Component {

  state={
    gameCaptions:[],
    photo: ""
  }

  componentDidMount(){
    fetch(API_URL+`/game_captions`)
    .then(res=>res.json())
    .then(gc=>{
      this.setState({
        gameCaptions: gc
      })
    })
  }

  sortCaptionsByPoints=()=>{
    return this.state.gameCaptions.sort((a, b)=>{
      return b.points-a.points
    })
  }

  winningCaption=()=>{
    return this.sortCaptionsByPoints().slice(0,1).map(gc=> gc.caption.text)
  }

  startNewGame=()=>{
    this.props.init()
    this.props.history.push('/')
  }

  render(){
    return(
      <>
      <h1>RESULTS PAGE</h1>
      <br></br>
      <h2>Winning Caption: {this.winningCaption()}</h2>
      <image src={this.props.lastAddedPhoto} />
      <ul>
      {this.sortCaptionsByPoints().slice(1).map(gc=>{
        return <li key={gc.id}>
                  {gc.caption.text}
                  <br></br>
                  {gc.points} points
                </li>
      })}
      </ul>
      <button onClick={this.startNewGame}>
      START A NEW GAME
      </button>
      </>
    )
  }
}

const mapStateToProps = (state)=>{
  return {gameCaptions: state.gameCaptions,
          lastAddedPhoto: state.lastAddedPhoto
          }
}

// const mapDispatchToProps = (dispatch)=>{
//   return {init: dispatch({type: '@@INIT'})}
// }

export default connect(mapStateToProps, { init })(withRouter(Results))
