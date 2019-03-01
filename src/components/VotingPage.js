import shuffle from 'shuffle-array'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Image, Button, List, Header } from 'semantic-ui-react'
import {API_URL} from '../constants/constants.js'

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
    pointValue = 3
  }

  handleVote = (event, gc)=>{

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
      {this.props.lastAddedPhoto &&
        <Image centered src={this.props.lastAddedPhoto} alt={"hi"}/>
      }
      <List as='ul' size='huge'>
      {this.shuffleCaptions().map((gc)=>{
        return <List.Item as='li' key={gc.id} onClick={(event)=>this.handleVote(event, gc)}>
          {gc.caption.text}
          </List.Item>
      })
      }
      </List>

      <Button color="orange" onClick={this.renderResults}>Go to results!</Button>
      </>
    )
  }

}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps)(withRouter(VotingPage))
