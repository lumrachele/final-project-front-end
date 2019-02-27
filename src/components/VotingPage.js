import shuffle from 'shuffle-array'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import CaptionContainer from './CaptionContainer'
import { Button, List, Header } from 'semantic-ui-react'

const API_URL = 'http://localhost:3000/api/v1'
let pointValue = 3

// MVP: click on top 3 votes
// 1st click = 1st place - 3 points
// 2nd click = 2nd place - 2 points
// 3rd click = 3rd place - 1 point

// when a person clicks on a vote this will display
// 1st, 2nd, or third place

// on click, find the instance of gameCaption
// patch the points to equal 3 on first click

// each click, the point value can be decremented by 1 point til 0


//when I use action cables, it should be a patch request to add points
// on to whatever value is already stored in points.

class VotingPage extends Component {

  state={
    captions: [],
    gameCaptions: []
  }

  componentDidMount(){
    // fetch(API_URL+`/games/${this.props.currentGame.id}`)
    // .then(res=>res.json())
    // .then(game=>{
    //   this.setState({
    //     captions: game.captions,
    //     gameCaptions: game.game_captions
    //   })
    // })
    pointValue = 3
  }

  handleVote = (event, gc)=>{
    // console.log(event.target.innerText+=` ${pointValue} points `)
    // const foundGC = this.props.submittedCaptions.find(gc => gc.caption_id===id)
    if (pointValue > 0){
      event.target.innerText+=` ${pointValue} points `
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
      .then(gc=> pointValue--)
    }//end of if statement
    else {
      alert('You may only vote on your top 3 choices.')
    }

  }
  //
  shuffleCaptions = ()=>{
    return shuffle(this.props.submittedCaptions)
  }

  renderResults=()=>{
    this.props.history.push('/results')
  }


  render(){
    console.log(this.props.submittedCaptions)
    return(
      <>
      <Header size='huge'>TIME TO VOTE!</Header>
      <Header as='h3'>Select your top 3 choices</Header>
      <List as='ul' size='huge'>
      {this.shuffleCaptions().map((gc)=>{
        return <List.Item as='li' key={gc.id} onClick={(event)=>this.handleVote(event, gc)}>
          {gc.caption.text}
          </List.Item>
      })
      }
      </List>
      <Header as='h2'>TIME'S UP! - make this into another component</Header>
      <Button onClick={this.renderResults}>Go to results!</Button>
      </>
    )
  }

}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps)(withRouter(VotingPage))
