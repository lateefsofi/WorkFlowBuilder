import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import * as actions from '../../store/bot-list/actions';
import moment from 'moment';

import './bot-list.component.scss';

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
        <td className="bot-name">{item.name}</td>
        <td>19</td>
        <td>19</td>
        {/* <td>{moment(item.modifiedAt).format('DD/MM/YYYY')} at {moment(item.modifiedAt).format('hh:mm a')}</td> */}
        <td>{moment(item.modifiedAt).fromNow()}</td>
        <td>{item.modifiedByName}</td>
        <td>TODO</td>
        <td>
          <Button onClick={()=>this.handleDelete(item.id)}>
            DELETE
          </Button>
        </td>
        <td>Analytics</td>
        <td onClick={()=>this.handleBotClick(item.id)}>Edit</td>
        
      </tr>
    ))
  }

  render() {
    return(
      <div>
        <div className="header">
          <span className="title"> Published Bots </span>
          <span className="filters">
            Filters
          </span>
        </div>
        <table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Conversions</th>
              <th>Goals</th>
              <th>Last Updated</th>
              <th>Updated By</th>
              <th>Status</th>
              <th>Delete</th>
              <th>Analytics</th>
              <th>Edit</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.getBotList()
            }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  botList: state.BotListReducer.botList
})

export default connect(mapStateToProps, { ...actions })(BotList);