import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { newGame } from '../actions/newGame.js'
import { addUserGame } from '../actions/addUserGame.js'
import { addGameCaptions } from '../actions/addGameCaptions.js'
import { Container, Header, Button, List, Image } from 'semantic-ui-react'

const API_URL = 'http://localhost:3000/api/v1'

class Home extends Component{
  state={
    userId: ""
  }
  //
  componentDidMount(){
    //from login
    this.setState({
      userId: this.props.currentUser.id
    })

  }

  handleClick = ()=>{
    fetch(API_URL+`/games`, {method: 'POST'})
    .then(res=>res.json())
    .then(game=>{
      fetch(API_URL+`/user_games`, {method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({user_game:{
          //will receive from login
          // user_id: this.props.currentUser.id,
          user_id: this.props.currentUser.id,
          game_id: game.id
          }
        })
      })
      .then(res=>res.json())
      .then(ug=>{
        this.props.addUserGame(ug)
      })
      return game

    })
    .then(game=>{
      // console.log(game)
      fetch(API_URL+`/captions`)
      .then(res=>res.json())
      .then(captions=>{
        const myPrompt = captions[Math.floor(Math.random()*captions.length)]
        fetch(API_URL+`/game_captions`, {method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            caption_id: myPrompt.id,
            game_id: game.id
          })
        })
        .then(res=>res.json())
        .then(gc=>{
          this.props.newGame(game,gc)
          this.props.history.push('/webcam')
        })
      })
    })

  }

// i need to fetch all captions, then randomly choose
// one to assign when creating a new gamecaption



  render(){
    return(
      <>
      <Container text className={'rules'}>
      <Header as ="h1">Welcome!</Header>

      <Header as ="h3" float="right">
        in-person version -> one computer
      </Header>
      <Image centered src="https://media3.giphy.com/media/OFcP2ojNIAkec/giphy.gif?cid=3640f6095c75a70342574d766fce6c67"/>
      <br></br>
      <Image centered src="https://media.giphy.com/media/KQLQGy30Hk5S8/giphy.gif"/>
      </Container>
      <Container text className={"gameplay"}>
      <Header size="huge" float="right">
        Game Play
      </Header>
      <Header size="huge" float="right">
        for 3+ players
      </Header>
      <List as='ol'>
      <List.Item as='li' size='large'>
        The youngest person in the room starts off as the host.
      </List.Item>
      <List.Item as='li' size='large'>
        All players except the host will close their eyes.
      </List.Item>
      <List.Item as='li' size='large'>
        When the host clicks 'Start Game', he or she will be shown a prompt. The host will have 5 seconds to pose before the picture is taken.
      </List.Item>
      <List.Item as='li' size='large'>
        The picture is sent to the game room for caption submission.
      </List.Item>
      <List.Item as='li' size='large'>
        Each player will take turns with the computer and submit their answers individually. They can submit as many answers as they like until the time is up.
      </List.Item>
      <List.Item as='li' size='large'>
        It's time to vote. All players (except the host) can decide as a group which captions are the Top 3 closest to the original prompt. The original prompt is hiding somewhere amongst the submitted answers.
      </List.Item>
      <List.Item as='li' size='large'>
        The results are in, and the original prompt is revealed!
      </List.Item>
      </List>
      <Button primary onClick={this.handleClick}>START A NEW GAME!</Button>
      </Container>
      </>
    )
  }
}
// if using websockets, "start game" will display a textbox underneath with the gameroom code for other users to join

const mapStateToProps = (state)=>{
  return state
}


export default connect(mapStateToProps, { newGame, addUserGame, addGameCaptions })(withRouter(Home))
