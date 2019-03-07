import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Icon, Grid } from 'semantic-ui-react'
import '../stylesheets/results.css'

class ResultsTable extends Component {
  componentDidMount(){

  }
  render(){
    return(
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>

          <Table style={{ maxWidth: 450 }} textAlign="center" className="table">
            <Table.Body>
            {this.props.currentPrompt &&
              this.props.sortedResults.map(gc=>{
              return <Table.Row key={gc.id}>
                      <Table.Cell>{gc.caption.text}</Table.Cell>
                      <Table.Cell>{gc.points} points</Table.Cell>

                      { this.props.currentPrompt.caption.text.includes(gc.caption.text)?
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
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps)(ResultsTable)
