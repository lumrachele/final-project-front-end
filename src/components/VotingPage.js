import shuffle from 'shuffle-array'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CaptionContainer from './CaptionContainer'
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
    fetch(API_URL+`/games/1`)
    .then(res=>res.json())
    .then(game=>{
      this.setState({
        captions: game.captions,
        gameCaptions: game.game_captions
      })
    })
  }

  handleVote = (event, id)=>{
    // console.log(event.target.innerText+=` ${pointValue} points `)
    const foundGC = this.state.gameCaptions.find(gc => gc.caption_id===id)
    if (pointValue > 0){
      event.target.innerText+=` ${pointValue} points `
      fetch(API_URL+`/game_captions/${foundGC.id}`, {method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          game_caption:{
            points: pointValue
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
    return shuffle(this.state.captions)
  }

  renderResults=()=>{
    this.props.history.push('/results')
  }


  render(){

    return(
      <>
      <h1>Voting Page OO la la</h1>
      <h3>Click on your top 3 votes</h3>
      <p>
        maps over the fetched game's captions
        -on click will patch to the gamecaption-
      </p>
      <ul>{this.shuffleCaptions().map((c)=>{
        return <li key={c.id} onClick={(event)=>this.handleVote(event, c.id)}>
          {c.text}
        </li>
      })
      }
      </ul>
      <h1>TIME'S UP! - make this into another component</h1>
      <button onClick={this.renderResults}>Go to results!</button>
      </>
    )
  }

}

const mapStateToProps = (state)=>{
  return {captions: state.captions}
}

export default connect(mapStateToProps)(withRouter(VotingPage))
