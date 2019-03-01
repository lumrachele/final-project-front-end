import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Header, Button, List, Image, Form, Label } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider'
import '../stylesheets/App.css'

//when a user joins a game, this will show
//up on the page and display all of the players in the room
// as well as a Start game button for the host when there are 3 or more players in the room


class WaitingRoom extends Component {

  render(){
    return (
      <div className={'waiting-room'}>
      <Header as='h3'>
        Gameroom {this.props.currentGame && this.props.currentGame.id}
      </Header>
      <Container>
        <div className='display-players'>
          <List as='ul'>
          {this.props.gamePlayers.map((p)=>{
            return <List.Item key={p.id}>{p.username}</List.Item>
          })}
          </List>
          {this.props.gamePlayers.length === 2 &&
            <Button primary onClick={this.startGame}>Start Game</Button>
          }
        </div>
      </Container>
      {this.props.currentUser.isHost &&
        <Button color="orange">Start Game!</Button>
      }
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps)(WaitingRoom)
