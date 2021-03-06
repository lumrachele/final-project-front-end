import shuffle from 'shuffle-array'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Image, Button, Grid, Header, Card, List } from 'semantic-ui-react'
import { updateCurrentGame, statusResults, replaceGC } from '../actions/allActions.js'

import '../stylesheets/VotingPage.css'
import {API_URL} from '../constants/constants.js'

let pointValue = 3

class VotingPage extends Component {
  state={
    // clickedColor: "",
    // captions: [],
    // gameCaptions: []
    shuffledCaptions: []
  }

  componentDidMount(){
    fetch(API_URL+`/games/${this.props.currentGame.id}`)
    .then(res=>res.json())
    .then(game=>{
      this.props.updateCurrentGame(game)
    })
    .then(game=>{
      this.setState({
        shuffledCaptions: shuffle(this.props.submittedCaptions)
      })

    })

    pointValue = 3
  }

  handleVote = (event, gc)=>{
    if (pointValue > 0){
      // this.setState({clickedColor: 'red'})
      event.target.innerText+=` ${pointValue} points `
      // event.target.innerText = ""
      fetch(API_URL+`/game_captions/${gc.id}`, {method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          game_caption:{
            points: gc.points+=pointValue
          }
        })
      })
      .then(res=> res.json())
      .then(gc=> this.props.replaceGC(gc))
      .then(gc=> pointValue--)
    }//end of if statement
    else {
      alert('You may only vote on your top 3 choices.')
    }
  }
  //
  // shuffleCaptions = ()=>{
  //   return shuffle(this.props.submittedCaptions)
  // }

  goToResults = ()=>{
    fetch(API_URL+`/results/${this.props.currentGame.id}`)
    // fetch(API_URL+`/games/${this.props.currentGame.id}`)
    // .then(res=>res.json())
    // .then(game=>this.props.updateCurrentGame(game))
    // .then(()=>{
    //   this.setState({loaded: true})
    // })
    // .then(()=>{
      // fetch(API_URL+`/results/${this.props.currentGame.id}`)
      // .then(res=>res.json())
      // .then(game=>this.props.updateCurrentGame(game))
      // .then(()=>{this.props.statusResults()})
    // })

  }

  render(){
    return(
      <div className={"voting"}>
      <Header size='huge'>TIME TO VOTE!</Header>
      <Header as='h3'>Select your top 3 choices in order.</Header>
      <List>
        <List.Item>first click - 3 points</List.Item>
        <List.Item>second click - 2 points</List.Item>
        <List.Item>third click - 1 points</List.Item>
      </List>
      {this.props.lastAddedPhoto &&
        <Image centered src={this.props.lastAddedPhoto} alt={"hi"}/>
      }

      <br></br>
      <Grid textAlign='center' style={{ height: '100%'}} verticalAlign='middle'>

        <Grid.Column verticalAlign='middle' id={'captions'} style={{maxWidth: 450}}>
        {this.state.shuffledCaptions.map((gc)=>{
          return <Card className={"ui card entry"}  key={gc.id} onClick={(event)=>this.handleVote(event, gc)}>
            <Card.Content >{gc.caption.text}</Card.Content>
            </Card>
          })
        }
        </Grid.Column>

      </Grid>

      <Button secondary onClick={this.goToResults}>Go to results!</Button>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps, {updateCurrentGame, statusResults, replaceGC})(withRouter(VotingPage))
