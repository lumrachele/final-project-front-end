import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {anotherGame, updateCurrentGame} from '../actions/allActions.js'
// import {init} from '../actions/init.js'
import { Button, Header, Icon, Image } from 'semantic-ui-react'
import ResultsTable from './ResultsTable.js'
import {API_URL} from '../constants/constants.js'

import '../stylesheets/results.css'


class Results extends Component {
  state={
    // gameCaptions:[],
    // prompt: null,
    // photo: ""
    loaded: false
  }

  componentDidMount(){
    console.log("in Results componentDidMount");
    // this.setState({
    //   gameCaptions: this.props.submittedCaptions,
    //   prompt: this.props.currentPrompt.caption.text
    // })
    // fetch(API_URL+`/games/${this.props.currentGame.id}`)
    // .then(res=>res.json())
    // .then(game=>this.props.updateCurrentGame(game))
    // .then(()=>{
    //   this.setState({loaded: true})
    // })
    // .then(()=>{
    //       debugger
    // })

  }

  componentWillUnmount(){
    fetch(API_URL+`/games/${this.props.currentGame.id}`, {method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        game:{
        isActive: false
        }
      })
    })
    .then(res=>res.json())
    .then(()=>{
      fetch(API_URL+`/anotherGame`, {method: "POST",
        headers:{
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      body: JSON.stringify({
        user_id: this.props.currentUser.id
      })
    })
      .then(()=>this.props.anotherGame())
      .then(()=>this.props.history.push('/home'))
    })
  }

  sortCaptionsByPoints=()=>{
    return this.props.submittedCaptions.sort((a, b)=>{
      return b.points-a.points
    })
  }

  // winningCaption=()=>{
  //   const winningText = this.sortCaptionsByPoints().map(gc=> gc.caption.text)
  //   if (winningText===this.props.currentPrompt.caption.text){
  //     return (<Header size="huge" icon="star" content={winningText}/>)
  //   } else {
  //     return (<Header size="huge">{winningText}</Header>)
  //   }
  // }

  startNewGame=()=>{
    fetch(API_URL+`/games/${this.props.currentGame.id}`, {method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        game:{
        isActive: false
        }
      })
    })
    .then(res=>res.json())
    .then(()=>{
      fetch(API_URL+`/anotherGame`, {method: "POST",
        headers:{
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      body: JSON.stringify({
        user_id: this.props.currentUser.id
      })
    })
      .then(()=>this.props.anotherGame())
      .then(()=>this.props.history.push('/home'))
    })
  }

  render(){

    return(
      <div className="results">
        <Header size="large">
        {this.props.currentPrompt.caption.text}
          <Header.Subheader>
          original prompt
          </Header.Subheader>
        </Header>
        <Image src={this.props.lastAddedPhoto} centered />
        <div className="table">
        <ResultsTable sortedResults={this.sortCaptionsByPoints()}/>
        </div>

        {this.props.currentUser.isHost
          &&
          <Button color="orange" onClick={this.startNewGame}>START A NEW GAME</Button>}
      </div>

    )
  }
}


const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps, { anotherGame, updateCurrentGame })(withRouter(Results))
