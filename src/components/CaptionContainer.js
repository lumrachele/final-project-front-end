import React, {Component} from 'react'
import { connect } from 'react-redux'
// import shuffle from 'shuffle-array'
// import { Button } from 'semantic-ui-react'
import { Header, Image, Button, Grid, Card } from 'semantic-ui-react'
import '../stylesheets/CaptionContainer.css'

class CaptionContainer extends Component {


  render(){
    return(
      <div className={'entries'}>
        <Grid textAlign='center' style={{ height: '100%'}} verticalAlign='middle'>
        <Grid.Row stretched textAlign='center'>

      {this.props.submittedCaptions.map((gc)=>{
        return(
            <Card className={"ui card"} key={gc.id}>
              <Card.Content>{gc.caption.text}</Card.Content>
              </Card>
        )
      })}

          </Grid.Row>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (state)=>{
  return {submittedCaptions: state.submittedCaptions}
}

export default connect(mapStateToProps)(CaptionContainer)

    // <Header as="h2">Entries</Header>
