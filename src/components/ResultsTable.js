import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Icon } from 'semantic-ui-react'

class ResultsTable extends Component {



  render(){
    return(
      <Table>
        <Table.Body>
        {this.props.currentPrompt &&
          this.props.sortedResults.slice(1).map(gc=>{
          return <Table.Row key={gc.id}>
                  <Table.Cell>{gc.caption.text}</Table.Cell>
                  <Table.Cell>{gc.points} points</Table.Cell>
                  { this.props.currentPrompt.caption.text === gc.caption.text?
                  <Table.Cell>
                  <Icon name='star' size='large' />
                  </Table.Cell>
                  :
                  <Table.Cell>
                  </Table.Cell>
                  }
                </Table.Row>
        })}

        </Table.Body>
      </Table>
    )
  }

}


const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps)(ResultsTable)
