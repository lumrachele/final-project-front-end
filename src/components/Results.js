import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {anotherGame} from '../actions/anotherGame.js'
// import {init} from '../actions/init.js'
import { Button, Header, Icon, Image } from 'semantic-ui-react'
import ResultsTable from './ResultsTable.js'
import '../stylesheets/results.css'


class Results extends Component {

  state={
    gameCaptions:[],
    prompt: null,
    photo: ""
  }
  //
  componentDidMount(){
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
      return (<Header.Content>
                <Icon name='star'size="huge" /> winningText
              </Header.Content>)
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
      <div className="results">
      <Header size="large">Winner:</Header>
      <Header size="huge" icon>
      {this.winningCaption()}
      </Header >

      <Image src={this.props.lastAddedPhoto} centered />
      <div className="table">
      <ResultsTable sortedResults={this.sortCaptionsByPoints()}/>
      </div>
      <Button color="orange" onClick={this.startNewGame}>
      START A NEW GAME
      </Button>
      </div>
    )
  }
}


const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps, { anotherGame })(withRouter(Results))
