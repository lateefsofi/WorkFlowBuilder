import React, { Component } from 'react';

import { BuilderTopNav } from './builder-top-nav/builder-top-nav.component';
import { ControlsLeftPanel } from './controls-left-panel/controls-left-panel.component';
import { BotBuilder } from './bot-builder/bot-builder.component';

import { isEmpty, ObjectId } from '../../shared/utils/utils';
import './builder-main.scss';

export class BuilderMain extends Component {
  constructor (props){
    super(props);
    this.state= {
      builderName: '',
      builderData: {}
    };

    this.onNameChangeHandler = this.onNameChangeHandler.bind(this);
    this.copyElementHandler = this.copyElementHandler.bind(this);
    this.deleteElementHandler = this.deleteElementHandler.bind(this);
    this.handleBotDataChange = this.handleBotDataChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      builderName: BotBuilderData.name,
      builderData: { ...BotBuilderData.data }
    }) 
  }

  onNameChangeHandler(e) {
    this.setState({
      builderName: e.target.value
    })
  }
  copyElementHandler(elementId) {
    const newObjectId = ObjectId();
    const newElement = JSON.parse(JSON.stringify(this.state.builderData[elementId]));
    newElement.id = newObjectId;
    newElement.pos.x += 20; 
    newElement.pos.y += 20; 
    newElement.options = newElement.options.map(item => {
      item.next=null;
      return item;
    })
    this.setState({
      builderData: {
        ...this.state.builderData,
        [newObjectId]: JSON.parse(JSON.stringify(newElement))
      }
    })
  }
  deleteElementHandler(elementId) {
    const updatedElements = JSON.parse(JSON.stringify(this.state.builderData)); // { ...this.state.builderData };
    delete updatedElements[elementId];
    this.setState({
      builderData: JSON.parse(JSON.stringify(updatedElements))
    });
  }

  handleBotDataChange(botData) {
    this.setState({
      builderData: JSON.parse(JSON.stringify(botData))
    });
  }

  render() {
    return (
      <div>
        <BuilderTopNav botName={this.state.builderName} onNameChangeHandler={this.onNameChangeHandler}/>
        <ControlsLeftPanel />
        <div className="bot-builder-main-container">
        {
          !isEmpty(this.state.builderData) && 
          <BotBuilder 
          handleBotDataChange={this.handleBotDataChange}
          copyElementHandler={this.copyElementHandler}
          deleteElementHandler={this.deleteElementHandler}
          botData={this.state.builderData}/>
        }
        </div>
      </div>
    );
  }
}

const BotBuilderData = {
  name: "Untitled Bot",
  data: {
    "fdafds54541": {
      id: "fdafds54541",
      type: "EMAIL",
      typeName: "Email",
      heading: "Please select your hobby?",
      options: [
        {value: "Cricket", next: "fdafds54542"},
        {value: "FootBall", next: null},
        {value: "Volleyball", next: "fdafds54543"}
      ],
      pos: {
        x: 460,
        y: 200
      }
    },
    "fdafds54542": {
      id: "fdafds54542",
      type: "PHONE",
      typeName: "Phone Number",
      heading: "Please select favrite language?",
      options: [
        {value: "C", next: null},
        {value: "C++", next: null},
        {value: "JAVA", next: null}
      ],
      pos: {
        x: 1000,
        y: 100
      }
    },
    "fdafds54543": {
      id: "fdafds54543",
      type: "BUTTON",
      typeName: "Buttons",
      heading: "Please select favourite city?",
      options: [
        {value: "Srinagar", next: null},
        {value: "Bangaluru", next: null},
        {value: "Mumbai", next: null}
      ],
      pos: {  
        x: 1000,
        y: 350
      }
    }
  }
}