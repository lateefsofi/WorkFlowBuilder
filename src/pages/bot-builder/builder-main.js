import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BuilderTopNav } from './builder-top-nav/builder-top-nav.component';
import ControlsLeftPanel from './controls-left-panel/controls-left-panel.component';
import BotBuilder  from './bot-builder/bot-builder.component';
import * as actions from '../../store/bot-builder/actions';

import { isEmpty, objectId } from '../../shared/utils/utils';
import './builder-main.scss';

const MAX_WAIT_TO_SAVE_DATA = 3; // max wait checks to save data
const DELAY_TO_SAVE_CHANGE = 5000; // 5 seconds
let dataSaveTimoutSubscription = null;
let maxWaitToSaveData = MAX_WAIT_TO_SAVE_DATA;

export class BuilderMain extends Component {
  constructor (props){
    super(props);
    this.onNameChangeHandler = this.onNameChangeHandler.bind(this);
    this.copyElementHandler = this.copyElementHandler.bind(this);
    this.deleteElementHandler = this.deleteElementHandler.bind(this);
    this.handleBotDataChange = this.handleBotDataChange.bind(this);
    this.handleAddUpdateBotElement = this.handleAddUpdateBotElement.bind(this);
  }

  componentDidMount() {
    const botId = new URLSearchParams(this.props.location.search).get('botId');
    if(botId) {
      //Get bot Data
    }
  }

  onNameChangeHandler(e) {
    this.updateChanges({
      name: e.target.value
    })
  }
  copyElementHandler(elementId) {
    const newObjectId = objectId();
    const newElement = JSON.parse(JSON.stringify(this.props.builderData.data[elementId]));
    newElement.id = newObjectId;
    newElement.pos.x += 20; 
    newElement.pos.y += 20; 
    newElement.next = null;
    if (newElement.options) {
      newElement.options = newElement.options.map(item => {
        item.next=null;
        return item;
      })
    }
    this.updateChanges({
      data: {
        ...this.props.builderData.data,
        [newObjectId]: JSON.parse(JSON.stringify(newElement))
      }
    })
  }
  deleteElementHandler(elementId) {
    let updatedElements = JSON.parse(JSON.stringify(this.props.builderData.data));
    delete updatedElements[elementId];
    Object.keys(updatedElements).forEach(key =>{
      if(updatedElements[key].next === elementId) {
        updatedElements[key].next = null;
      }
      if(updatedElements[key].options) {
        updatedElements[key].options = updatedElements[key].options.map(option => {
          if(option.next === elementId) {
            option.next = null;
          }
          return option;
        })
      }
    })
    this.updateChanges({
      data: JSON.parse(JSON.stringify(updatedElements))
    })
  }

  handleBotDataChange(botData) {
    this.updateChanges({
      data: JSON.parse(JSON.stringify(botData))
    })
  }

  updateChanges(newBotChanges) {
    this.props.updateBotData(newBotChanges);
    this.saveBotChanges(newBotChanges);
  }


  saveBotChanges(data) {
    const timeToWait = maxWaitToSaveData === 0? 0: DELAY_TO_SAVE_CHANGE;
    clearTimeout(dataSaveTimoutSubscription);
    dataSaveTimoutSubscription = setTimeout(() => {
      maxWaitToSaveData = MAX_WAIT_TO_SAVE_DATA;
      this.props.saveBotElements(data);
    }, timeToWait)
    maxWaitToSaveData--;
  }

  handleAddUpdateBotElement(newBotElement) {
    const builderData = JSON.parse(JSON.stringify(this.props.builderData.data));
    builderData[newBotElement.id] = newBotElement;
    this.updateChanges({
      data: JSON.parse(JSON.stringify(builderData))
    })
  }

  render() {
    console.log('this.props.builderData: ', this.props.builderData);
    return (
      <div>
        <BuilderTopNav botName={this.props.builderData.name} onNameChangeHandler={this.onNameChangeHandler}/>
        <ControlsLeftPanel handleAddUpdateBotElement={this.handleAddUpdateBotElement}/>
        <div className="bot-builder-main-container">
        {
          !isEmpty(this.props.builderData.data) && 
          <BotBuilder 
          handleBotDataChange={this.handleBotDataChange}
          copyElementHandler={this.copyElementHandler}
          deleteElementHandler={this.deleteElementHandler}
          botData={this.props.builderData.data}/>
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  builderData: state.BotBuilderReducer.builderData
})

export default connect(mapStateToProps, {
  ...actions
})(BuilderMain);