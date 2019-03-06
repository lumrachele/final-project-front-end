import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Header, Button, List, Image, Form, Label } from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider'
import '../stylesheets/App.css'
import {API_URL} from '../constants/constants.js'
import {addPlayers} from '../actions/allActions.js'

//when a user joins a game, this will show
//up on the page and display all of the players in the room
// as well as a Start game button for the host when there are 3 or more players in the room


class WaitingRoom extends Component {
  // state={
  //   // players: []
  // }

  handleStart=()=>{
    fetch(API_URL+'/start')
    .then(()=>{this.props.history.push('/game')})
  }

  componentDidMount(){
    fetch(API_URL+`/games/${this.props.currentGame.id}`)
    .then(res=>res.json())
    .then(game=>{
      this.props.addPlayers(game)
    })

  }


  render(){
    return (
      <div className={'waiting-room'}>
      <ActionCableConsumer
      channel={{channel: 'GamesChannel'}}
      onReceived={(data)=>{
        console.log("the stuff", data);
      }}
      />
      <Header as='h3'>
        Gameroom {this.props.currentGame && this.props.currentGame.id}
      </Header>
      <Container>
        <div className='display-players'>
          <List as='ul'>
            {this.props.players.map((p)=>{
              return <List.Item key={p.id}>{p.username}</List.Item>
            })}
          </List>
        </div>
      </Container>
      {this.props.currentUser && this.props.currentUser.isHost &&
        <Button color="orange" onClick={this.handleStart}>Start Game!</Button>
      }
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps, {addPlayers})(withRouter(WaitingRoom))
