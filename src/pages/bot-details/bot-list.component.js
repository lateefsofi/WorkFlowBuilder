import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import * as actions from '../../store/bot-list/actions';

export class BotList extends Component {
  componentDidMount(){
    this.props.getBotList();
  }

  handleBotClick(botId) {
    this.props.history.push({
      pathname: '/bot-builder',
      search: "?" + new URLSearchParams({botId}).toString()
    })
  }

  handleDelete(botId) {
    this.props.deleteBot(botId)
  }

  getBotList() {
    return this.props.botList.map( (item, index) => (
      <tr key={`bot-list-${index}`} >
        <td>{index+1}</td>
        <td onClick={()=>this.handleBotClick(item.id)}>{item.name}</td>
        <td>{item.ModifiedAt}</td>
        <td>{item.ModifiedBy}</td>
        <td>
          <Button onClick={()=>this.handleDelete(item.id)}>
            DELETE
          </Button>
        </td>
      </tr>
    ))
  }

  render() {
    return(
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Bot Name</th>
              <th>Last Modified</th>
              <th>Modified By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.getBotList()
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  botList: state.BotListReducer.botList
})

export default connect(mapStateToProps, { ...actions })(BotList);