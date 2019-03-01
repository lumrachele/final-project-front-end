import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { newGame } from '../actions/newGame.js'
import { addUserGame } from '../actions/addUserGame.js'
import { addGameCaptions } from '../actions/addGameCaptions.js'
import { addPlayerToExistingGame } from '../actions/addPlayerToExistingGame.js'
import WaitingRoom from './waitingRoom.js'
import { Container, Header, Button, List, Image, Form, Label } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider'
import { onlineRules } from '../constants/rules.js'
import {API_URL} from '../constants/constants.js'

class Home extends Component{
  state={
    userId: null,
    gameCode: "",
    // gameCreated: false,
    gamePlayers: [],
    enterGame: false,
  }
  //
  componentDidMount(){
    //from login
    this.setState({
      userId: this.props.currentUser.id
    })
  }

//host
  createGame = ()=>{
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
        this.setState({
          gameCreated: true
        })
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
          // this.props.history.push('/webcam') // instead, render a div below that displays all players in the game
        })
        .then(()=>{
          setTimeout(()=>{
            this.displayPlayers()
          }, 1000)
        })
        .then(()=>{
          this.setState({
            enterGame: true
          })
        })
      })
    })
  }

  displayPlayers = ()=>{
    fetch(API_URL+`/games/${this.props.currentGame.id}`)
    .then(res=>res.json())
    .then(game=>{
        this.setState({
          gamePlayers: game.users
        })
    })
  }

// join as player
  grabGameCode = (event)=>{
    this.setState({
      gameCode: event.target.value
    })
  }

//creates a new userGame for a player that joins a game
  submitGameCode = (event)=>{
    event.preventDefault()
    const gameId = this.state.gameCode
    fetch(API_URL+`/user_games`, {method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({user_game:{
        //will receive from login
        // user_id: this.props.currentUser.id,
        user_id: this.props.currentUser.id,
        game_id: gameId
        }
      })
    })
    .then(res=>res.json())
    .then(ug=>{
      this.props.addPlayerToExistingGame(ug.user, ug.game)
    })
    .then(()=>{
      this.displayPlayers()
      this.setState({
        enterGame: true
      })
    })
  }


  render(){
    return(
      <div className={'ui grid' }>
        <ActionCable
        channel={{channel: 'HomeChannel'}}
        onReceived={(whatIsThis)=>console.log(whatIsThis)}
         />
         <div className='two column row'>
          <div text className={'column'}>
        {!this.state.enterGame ?
          <>
            <Header as ="h1">Welcome {this.props.currentUser.username}!</Header>
            <Button color="orange" onClick={this.createGame}>Create New Game</Button>
            <br></br>
            <Header as ="h3">or</Header>
            <br></br>
            {<Form onSubmit={this.submitGameCode}>
              <Label>Enter Game Code to Join an Existing Game</Label>
              <Form.Input type="text" value={this.state.gameCode} onChange={this.grabGameCode} placeholder={'game code'}style={{ maxWidth: 200 }}>
              </Form.Input>
            </Form>}
          </>
          :
            <WaitingRoom gamePlayers={this.state.gamePlayers}/>
          }

          </div>

          <div text className={"column"}>
            <Header size="huge" float="right">Game Play</Header>
            <Header size="huge" float="right">for 3 or more players</Header>
            <List as='ol'>
              {onlineRules.split(". ").map(rule=>{
                return <List.Item as='li' size='large'>
                        {rule}
                      </List.Item>
              })}
            </List>
            <Image centered src="https://media3.giphy.com/media/OFcP2ojNIAkec/giphy.gif?cid=3640f6095c75a70342574d766fce6c67"/>
            <br></br>
            <Image centered src="https://media.giphy.com/media/KQLQGy30Hk5S8/giphy.gif"/>
          </div>
        </div>
      </div>
    )
  }
}
// if using websockets, "start game" will display a textbox underneath with the gameroom code for other users to join

const mapStateToProps = (state)=>{
  return state
}


export default connect(mapStateToProps, { newGame, addUserGame, addGameCaptions, addPlayerToExistingGame })(withRouter(Home))
