import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {anotherGame} from '../actions/anotherGame.js'
// import {init} from '../actions/init.js'
import { Button, Header, Icon, Image } from 'semantic-ui-react'
import ResultsTable from './ResultsTable.js'

// const API_URL = 'http://localhost:3000/api/v1'
class Results extends Component {

  state={
    gameCaptions:[],
    prompt: null,
    photo: ""
  }
  //
  componentDidMount(){
  //   fetch(API_URL+`/game_captions`)
  //   .then(res=>res.json())
  //   .then(gc=>{
  //     this.setState({
  //       gameCaptions: gc
  //     })
  //   })
    this.setState({
      gameCaptions: this.props.submittedCaptions,
      prompt: this.props.currentPrompt.caption.text
    })
  }

  sortCaptionsByPoints=()=>{
    return this.state.gameCaptions.sort((a, b)=>{
      return b.points-a.points
    })
  }

  winningCaption=()=>{
    const winningText = this.sortCaptionsByPoints().slice(0,1).map(gc=> gc.caption.text)
    if (winningText===this.state.prompt){
      return (<> {winningText}
                <Icon name='star' size='large' />
              </>)
    } else {
      return winningText
    }


  }

  startNewGame=()=>{
    this.props.anotherGame()
    this.props.history.push('/home')
  }

  render(){

    return(
      <>
      <Header size="large">Winner:</Header>
      <br></br>
      <Header size="huge">{this.winningCaption()}</Header >
      <Image src={this.props.lastAddedPhoto} centered />
      <ResultsTable sortedResults={this.sortCaptionsByPoints()}/>
      <Button primary onClick={this.startNewGame}>
      START A NEW GAME
      </Button>
      </>
    )
  }
}
// <ul>
// {this.props.submittedCaptions && this.sortCaptionsByPoints().slice(1).map(gc=>{
//   return <li key={gc.id}>
//   {gc.caption.text} {gc.points} points
//   </li>
// })}
// </ul>

const mapStateToProps = (state)=>{
  return state
}

// const mapDispatchToProps = (dispatch)=>{
//   return {init: dispatch({type: '@@INIT'})}
// }

export default connect(mapStateToProps, { anotherGame })(withRouter(Results))
