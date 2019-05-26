import React, { Component } from 'react';
import { connect } from 'react-redux';

import './controls-left-panel.component.scss';
import { objectId } from '../../../shared/utils/utils';
import BotControlSettingsComponent from './bot-control-settings.component';
import { setEditData } from '../../../store/bot-builder/actions';
import { TYPES } from '../../../shared/constants/bot-control-types.constants';

import { controlsData, additionalBlocksData }from './element-data';


export class ControlsLeftPanel extends Component {
  constructor (props){
    super(props);
    this.state = {
      selectedElement: null
    }
    // this.addNewElementHandler = this.addNewElementHandler.bind(this);
    this.elementDetailsSaveHandler = this.elementDetailsSaveHandler.bind(this);
    this.toggleControlSettings = this.toggleControlSettings.bind(this);
  }
  toggleControlSettings() {
    this.props.setEditData(null);
  }
  elementDetailsSaveHandler(updatedElement) {
    this.props.handleAddUpdateBotElement(updatedElement);
    this.props.setEditData(null);
  }
  addNewElementHandler(element) {
    element = JSON.parse(JSON.stringify(element));
    this.props.setEditData({
        ...element,
        id: objectId(),
        heading: "",
        placeholder: element.placeholder || '',
        pos: {  
          x: window.scrollX + window.innerWidth/2,
          y: window.scrollY + window.innerHeight/2 - 150
        }
    });
  }
  
  render() {
    const getElements = elementsList =>
      elementsList.map((element, index) => <li key={index} role="button" tabIndex="0" onClick={this.addNewElementHandler.bind(this, element)}>
        <span className="icon-container">
          <i className={element.icon}></i>
        </span>
        <span className="name"> { element.name } </span>
      </li>)
    const additionalBlock = elementsList =>
      elementsList.map((element, index)=>
      <button key={index}>
        { element.name }
        <span className="plus-icon">+</span>
      </button>
      )
    
    return (
      <section className="controls-left-panel">
        <section className="controls-section">
          <div className="title">Add New Block</div>
          <ul>
            {getElements(controlsData)}
          </ul>
          <div className="title">Additional Blocks</div>
          <div className="additonal-blocks">
            { additionalBlock(additionalBlocksData) }
          </div>
        </section>
        <BotControlSettingsComponent 
          elementDetailsSaveHandler={this.elementDetailsSaveHandler}
          toggleControlSettings={this.toggleControlSettings}
          />
      </section>
    );
  }
}

export default connect(null, { setEditData })(ControlsLeftPanel);