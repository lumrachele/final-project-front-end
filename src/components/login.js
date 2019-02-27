import React , { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addCurrentUser } from '../actions/addCurrentUser'
import { init } from '../actions/init'
import { Header, Image, Button, Grid, Form, Segment, Message } from 'semantic-ui-react'
import '../stylesheets/login.css'

const API_URL = 'http://localhost:3000/api/v1'

class Login extends Component {

  state={
    username: "",
    showNewUserForm: false,
    newUsername: ""
  }

  componentDidMount(){
    this.props.init()
  }

  handleChange=(event)=>{
    this.setState({
      username: event.target.value
    })
  }

  handleSubmit = (event)=>{
    event.preventDefault()
    fetch(API_URL+`/users`)
    .then(res=>res.json())
    .then(users=> {
      const foundUser = users.find(user=> user.username===this.state.username)
      if (foundUser){
        this.props.addCurrentUser(foundUser)
        this.props.history.push('/home')
      }
      else{
        alert('It looks like you do not have an account. Please sign up.')
      }
    })
  }

  handleClick=()=>{
    alert("Oops! This feature is not yet available.")
    // this.setState({
    //   showNewUserForm: true
    // })
  }

  handleNewUserInput = (event) =>{
    this.setState({
      newUsername: event.target.value
    })
  }

  handleCreateNew = (event) =>{
    event.preventDefault()
    if (this.state.newUsername.length >= 3){
      console.log("new user:", this.state.newUsername);
    } else {
      alert("username length must be greater than 2 characters.")
    }
  }

  render(){
    return (
      <div className="login">

      <Header as="h2" icon textAlign="center">
      <Image src="http://is2.mzstatic.com/image/thumb/Purple62/v4/2b/ab/cc/2babccfc-f857-765f-4cf0-b645e6bd373c/source/175x175-75.png"/>
      <Header.Content>
        WePoVo!
      </Header.Content>
      </Header>
      <br></br>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h3' color='orange' textAlign='center'>
                 Log-in to your account
              </Header>
              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='username' onChange={this.handleChange}/>
                  <Button color="orange" type="submit" name="submit" fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us?
                <strong size="medium" onClick={this.handleClick}> Sign Up</strong>
              </Message>
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
