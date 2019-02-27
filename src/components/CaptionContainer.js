import React, {Component} from 'react'
import { connect } from 'react-redux'
// import shuffle from 'shuffle-array'
// import { Button } from 'semantic-ui-react'

class CaptionContainer extends Component {


  render(){
    return(
      <div>
      <h2>
        Caption Container
      </h2>
      <p>
        maps over the submitted captions in state
      </p>
      <ul>
      {this.props.submittedCaptions.map((caption)=>{
        return(
          <li key={caption.id} >
          {caption.text}
          </li>
        )
      })}
      </ul>
      </div>
    )
  }
}


const mapStateToProps = (state)=>{
  return {submittedCaptions: state.submittedCaptions}
}

export default connect(mapStateToProps)(CaptionContainer)
