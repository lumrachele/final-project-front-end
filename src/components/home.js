import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
// import { newGame } from '../actions/newGame.js'
// import { addUserGame } from '../actions/addUserGame.js'
// import { addGameCaptions } from '../actions/addGameCaptions.js'
// import { playerJoin } from '../actions/playerJoin.js'
// import { addCurrentUser } from '../actions/addCurrentUser.js'
import '../stylesheets/home.css'
import { addCurrentUser, newGame, updateAllGames, playerJoin, updateCurrentGame, addPlayers, addHostUserGame, anotherGame, logout } from '../actions/allActions.js'
import WaitingRoom from './waitingRoom.js'
import { Container, Header, Button, List, Image, Icon, Form, Label, Segment, Grid} from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { onlineRules } from '../constants/rules.js'
import {API_URL} from '../constants/constants.js'

class Home extends Component{
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


  handleLogout = ()=>{
    this.props.logout()
    window.location.reload()
    this.props.history.push("/")
  }

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
    .then(user=> this.props.addCurrentUser(user))
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
      .then(ug=>this.props.addHostUserGame(ug))
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
        })
        .then(()=>{
          this.setState({
            enterGame: true
          })
        })
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
        user_id: this.props.currentUser.id,
        game_id: gameId
        }
      })
    })
    .then(res=>res.json())
    .then(ug=>{
      if (ug.game.isActive){
        fetch(API_URL+`/games`)
        .then(res=>res.json())
        .then(games=>{
          this.props.updateAllGames(games)
          return games
        })
        .then(games=>{
          const foundGame = this.props.games.find((game) => game.id === parseInt(gameId))
          this.props.newGame(foundGame, foundGame.game_captions[0], this.props.currentUser)
        })
        .then(()=>{
          this.setState({
            enterGame: true
          })
        })
      } else {
        alert('That game is not currently active.')
      }



    })
    // .then(ug=>{
    //   fetch(API_URL+`/games`)
    //   .then(res=>res.json())
    //   .then(games=>{
    //     this.props.updateAllGames(games)
    //     return games
    //   })
    //   .then(games=>{
    //     const foundGame = this.props.games.find((game) => game.id === parseInt(gameId))
    //     this.props.newGame(foundGame, foundGame.game_captions[0], this.props.currentUser)
    //   })
    //   .then(()=>{
    //     this.setState({
    //       enterGame: true
    //     })
    //   })
    // })

  }


// action cable received
  handleReceived = (data)=>{
    console.log("receiving on home channel:", data)
    switch (data.type){
      case 'ADD_PLAYERS':
        fetch(API_URL+`/games`)
        .then(res=>res.json())
        .then(games=>{
          this.props.updateCurrentGame(games[parseInt(games.length-1)])
          this.props.addPlayers(games[parseInt(games.length-1)])
          return games
      })
      return null
    case 'GAME_HAS_BEEN_STARTED':
      return this.props.history.push('/game')
    case 'ANOTHER_GAME':
      this.props.anotherGame()
      return this.props.history.push('/home')
    default:
      return null
          // here is where I am going to change the route?
    }

  }

  render(){
    return(
        <div className={'ui grid' }>
        <ActionCableConsumer
        channel={{channel: 'HomeChannel'}}
        onReceived={(data)=>{
          this.handleReceived(data)
        }}
        />

          <div className={"logout-button"}>
            <Button onClick={this.handleLogout}>Log Out</Button>
          </div>

         <div className='two column row' id={"home-stuff"}>

          <div text className={"column game-play"} textAlign='left' >
            <Header as="h1" id={"game-play-header"} float="right">Game Play</Header>
            <Header size="large" float="right">for 3 or more players</Header>

            <div className={'rules'}>
            <Grid textAlign='left' style={{ height: '100%' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 550 }}>
                <List className={"rules-container"}>
                  {onlineRules.split(". ").map(rule=>{
                    return <List.Item as='li' size='large' key={rule.index}>

                    <Icon name="pointing right"/>
                            {rule}
                        </List.Item>
                  })}
                </List>
            </Grid.Column>
          </Grid>
          </div>
            <br></br>
            <br></br>

          </div>

          <div text className={'column'}>
          {!this.state.enterGame ?
            <>
            <Header as ="h1" id={"welcome"}>Welcome {this.props.currentUser.username}!</Header>
            <br></br>
            <br></br>
            <Button secondary className={"huge"} onClick={this.createGame}>Host A New Game</Button>
            <br></br>
            <Header as ="h3">or</Header>
            <br></br>

            {<Form onSubmit={this.submitGameCode}>
            <h3>Enter Game Code to Join an Existing Game</h3>
            <Form.Input type="text" value={this.state.gameCode} onChange={this.grabGameCode} placeholder={'game code'}style={{ maxWidth: 200 }}>
            </Form.Input>
            </Form>}
            <Image id={"fashion"} centered src="https://media3.giphy.com/media/OFcP2ojNIAkec/giphy.gif?cid=3640f6095c75a70342574d766fce6c67"/>
            <br></br>

            </>
            :
            <WaitingRoom />
          }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps, { newGame, updateAllGames, updateCurrentGame, addPlayers, addCurrentUser, addHostUserGame, anotherGame, logout })(withRouter(Home))

// <Image centered src="https://media.giphy.com/media/KQLQGy30Hk5S8/giphy.gif"/>
