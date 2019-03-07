import React , { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addCurrentUser, init } from '../actions/allActions.js'
import {Animated} from "react-animated-css";
// import { init } from '../actions/init'
import { Header, Image, Button, Grid, Form, Segment, Message } from 'semantic-ui-react'
import '../stylesheets/login.css'
import {API_URL} from '../constants/constants.js'
import { ActionCableConsumer } from 'react-actioncable-provider'

class Login extends Component {
  state={
    // username: "",
    // showNewUserForm: false,
    newUsername: ""
  }

  componentDidMount(){
    return this.props.init()
  }

  handleChange=(event)=>{
    this.setState({
      newUsername: event.target.value
    })
  }

  // handleSubmit = (event)=>{
  //   event.preventDefault()
  //   fetch(API_URL+`/users`)
  //   .then(res=>res.json())
  //   .then(users=> {
  //     const foundUser = users.find(user=> user.username===this.state.username)
  //     if (foundUser){
  //       this.props.addCurrentUser(foundUser)
  //     }
  //     else{
  //       alert('It looks like you do not have an account. Please sign up.')
  //     }
  //   })
  //   .then(()=>{this.props.history.push('/home')})
  // // }
  //
  // handleNewUserInput = (event) =>{
  //   this.setState({
  //     newUsername: event.target.value
  //   })
  // }

  handleCreateNew = (event) =>{
    event.preventDefault()
    if (this.state.newUsername.length >= 3){
      fetch(API_URL+`/users`, {method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user:{
            username: this.state.newUsername
          }
        })
      })
      .then(res=>res.json())
      .then(newUser=>this.props.addCurrentUser(newUser))
      .then(()=>{this.props.history.push('/home')})

    } else {
      alert("username length must be greater than 2 characters.")
    }
  }

  render(){
    return (
      <div className="login">

      <div className={"title"}>
      <Header as="h2" icon textAlign="center">
        <Header.Content id={'title-content'}>Weegle</Header.Content>
        </Header>
        <br></br>
          <Header as="h2" icon textAlign="center">
        <Header.Subheader id={"description"}>The hit new party game that makes you weegle and geegle!</Header.Subheader>
      </Header>
      </div>

      <br></br>


      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }} className={"signup-form"}>
          <Header as='h2' color='black' textAlign='center'>
            Create your username
          </Header>
          <Form size='large' onSubmit={this.handleCreateNew} >
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='username' onChange={this.handleChange}/>
              <Button color="orange" type="submit" name="submit" fluid size='large'>
                Let's play!
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, { addCurrentUser, init })(withRouter(Login))

// {this.state.showNewUserForm &&
//   <div className="new-user-form">
//   <label>New Username</label>
//   <Form>
//     <input style={"width:200px"} placeholder="new user" type="text" name="newUser" value={this.state.newUsername} onChange={this.handleNewUserInput}/>
//   </Form>
//   </div>
// }
// <Image src="http://is2.mzstatic.com/image/thumb/Purple62/v4/2b/ab/cc/2babccfc-f857-765f-4cf0-b645e6bd373c/source/175x175-75.png"/>
