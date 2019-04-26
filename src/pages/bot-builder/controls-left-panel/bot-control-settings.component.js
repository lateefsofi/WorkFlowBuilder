import React, { Component } from 'react';

export class BotControlSettingsComponent extends Component {
  render(){
    const {elementDetailsSaveHandler, elementDetails, toggleControlSettings} = this.props;
    return(
      <section className={`control-properties-section ${elementDetails?'active':''}`}>
        <i className="close arrow-left" onClick={toggleControlSettings.bind(null, false)}>
        </i>
        <button onClick={elementDetailsSaveHandler.bind(null, elementDetails)}>
          Create
        </button>
      </section>
    );
  }
}

export default BotControlSettingsComponent;