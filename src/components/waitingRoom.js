import React, { Component } from 'react';
// import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Header, Button, List, Image, Form, Label } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider'
import '../stylesheets/App.css'
import {API_URL} from '../constants/constants.js'
import { getWaitingRoomPlayers } from '../actions/getWaitingRoomPlayers.js'
//when a user joins a game, this will show
//up on the page and display all of the players in the room
// as well as a Start game button for the host when there are 3 or more players in the room


class WaitingRoom extends Component {
  state={
    // players: []
  }

  render(){
    console.log("In waitingROOM", this.props);
    return (
      <div className={'waiting-room'}>
      <ActionCable
          channel={{ channel: 'GamesChannel', game_id: this.props.currentGame.id  }}
          onReceived={(receivedGame)=>{console.log('What is this now?', receivedGame)}}
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
        <Button color="orange">Start Game!</Button>
      }
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps, {getWaitingRoomPlayers})(WaitingRoom)
