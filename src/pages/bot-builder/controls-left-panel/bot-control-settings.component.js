import React, { Component } from 'react';

import { OptionsFormComponent } from './forms/options-form.component';

export class BotControlSettingsComponent extends Component {
  saveElementPropsHandler(element) {
    this.props.elementDetailsSaveHandler(element);
  }
  render(){
    const {elementDetailsSaveHandler, elementDetails, toggleControlSettings} = this.props;
    return(
      <section className={`control-properties-section ${elementDetails?'active':''}`}>
        <div className="back-container">
          <i className="close arrow-left" onClick={toggleControlSettings.bind(null, false)}>
          </i>
        </div>
        { elementDetails &&
          <div>
            <OptionsFormComponent 
            element={elementDetails}
            saveElementPropsHandler={this.props.elementDetailsSaveHandler} />
          </div>
        }
        {/* <button onClick={elementDetailsSaveHandler.bind(null, elementDetails)}>
          Create
        </button> */}
      </section>
    );
  }
}

export default BotControlSettingsComponent;