import React, { Component } from 'react';
import './controls-left-panel.component.scss';
import { objectId } from '../../../shared/utils/utils';
import { BotControlSettingsComponent } from './bot-control-settings.component';
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
  toggleControlSettings(selectedElement) {
    this.setState({
      selectedElement: selectedElement || null
    })
  }
  elementDetailsSaveHandler(updatedElement) {
    this.props.handleAddUpdateBotElement(updatedElement);
    this.setState({
      selectedElement: null
    })
  }
  addNewElementHandler(element) {
    this.setState({
      selectedElement: {
        ...element,
        id: objectId(),
        heading: "",
        placeHolder: element.placeHolder || '',
        pos: {  
          x: window.scrollX + window.innerWidth/2,
          y: window.scrollY + window.innerHeight/2 - 150
        }
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
          elementDetails={this.state.selectedElement} 
          elementDetailsSaveHandler={this.elementDetailsSaveHandler}
          toggleControlSettings={this.toggleControlSettings}
          />
      </section>
    );
  }
}