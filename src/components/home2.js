import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
// import { newGame } from '../actions/newGame.js'
// import { addUserGame } from '../actions/addUserGame.js'
// import { addGameCaptions } from '../actions/addGameCaptions.js'
// import { playerJoin } from '../actions/playerJoin.js'
import { addCurrentUser } from '../actions/addCurrentUser.js'
import { newGame, updateAllGames, playerJoin } from '../actions/allActions.js'
import WaitingRoom from './waitingRoom.js'
import { Container, Header, Button, List, Image, Form, Label } from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { onlineRules } from '../constants/rules.js'
import {API_URL} from '../constants/constants.js'

class Home2 extends Component{
  state={
    gameCode: "",
    enterGame: false,
  }

  // componentDidMount(){
  //   fetch(API_URL+`/games`)
  //     .then(res=>res.json())
  //     .then(games=>{
  //       this.props.updateAllGames(games)
  //     })
  // }

  updateUser = ()=>{
    fetch(API_URL+`/users/${this.props.currentUser.id}`, {method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({user:{
        isHost: true
      }
      })
    })
    .then(res=>res.json())
    // .then(user=> this.props.addCurrentUser(user))
  }
//host
  createGame = ()=>{
    this.updateUser()
    fetch(API_URL+`/games`, {method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

      // body: JSON.stringify({game:{
      //   isActive: this.props.currentUser.id
      //   }
      // })
    .then(res=>res.json())
    .then(game=>{
      fetch(API_URL+`/user_games`, {method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({user_game:{
          user_id: this.props.currentUser.id,
          game_id: game.id
          }
        })
      })
      .then(res=>res.json())
      // .then(ug=>console.log(ug))
      return game
    })
    .then(game=>{
      fetch(API_URL+`/captions`)
      .then(res=>res.json())
      .then(captions=>{
        const myPrompt = captions[Math.floor(Math.random()*captions.length)]
        fetch(API_URL+`/game_captions`, {method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({game_caption:{
            caption_id: myPrompt.id,
            game_id: game.id
          }
          })
        })
        .then(res=>res.json())
        .then(gc=>{
          this.props.newGame(game,gc,this.props.currentUser)

          // this.props.newGame(game,gc)
          // this.props.history.push('/webcam')
        })
        .then(()=>{
          this.setState({
            enterGame: true
          })
        })
      })
    })
  }

  // displayPlayers = ()=>{
  //   fetch(API_URL+`/games/${this.props.currentGame.id}`)
  //   .then(res=>res.json())
  // }

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
        user_id: this.props.currentUser.id,
        game_id: gameId
        }
      })
    })
    .then(res=>res.json())
    .then(ug=>{
      fetch(API_URL+`/games`)
      .then(res=>res.json())
      .then(games=>{
        this.props.updateAllGames(games)
        return games
      })
      .then(games=>{
        const foundGame = this.props.games.find((game) => game.id === parseInt(gameId))
        this.props.newGame(foundGame, foundGame.captions[0], this.props.currentUser)
      })
      .then(()=>{
        this.setState({
          enterGame: true
        })
      })
      // this.props.playerJoin(ug.game)
      // this.props.addUserGame(ug,ug.game)
    })
    .then(()=>{

    })
  }


  render(){
    return(
        <div className={'ui grid' }>
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
            <WaitingRoom />
          }
          </div>

          <div text className={"column"}>
            <Header size="huge" float="right">Game Play</Header>
            <Header size="huge" float="right">for 3 or more players</Header>
            <List as='ol'>
              {onlineRules.split(". ").map(rule=>{
                return <List.Item as='li' size='large' key={rule.index}>
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

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps, { newGame, updateAllGames })(withRouter(Home2))
