import React , { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addCurrentUser } from '../actions/addCurrentUser'
import { init } from '../actions/init'
import { Button } from 'semantic-ui-react'

const API_URL = 'http://localhost:3000/api/v1'

class Login extends Component {

  state={
    username: ""
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

  render(){
    return (
      <>
      <h1>
        login page
      </h1>
      <form onSubmit={this.handleSubmit}>
        <label>Username</label>
        <br></br>
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
        <br></br>
        <br></br>

        <Button  primary type="submit" name="submit">
        Log In
        </Button>
      </form>
      <br></br>
      <p>New? Create a new account.</p>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, { addCurrentUser, init })(withRouter(Login))
