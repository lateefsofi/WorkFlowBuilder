import React, { Component } from 'react';

import { OptionsFormComponent } from './forms/options-form.component';
import { MessageFormComponent } from './forms/message-form.component';
import { TYPES } from '../../../shared/constants/bot-control-types.constants';

export class BotControlSettingsComponent extends Component {
  saveElementPropsHandler(element) {
    this.props.elementDetailsSaveHandler(element);
  }

  getFormhandler(elementDetails) {
    switch(elementDetails.type) {
      case TYPES.MESSAGE:
        return (<MessageFormComponent element={elementDetails}
          saveElementPropsHandler={this.props.elementDetailsSaveHandler}/>);
      case TYPES.NAME:
        break;
      case TYPES.EMAIL:
        break;
      case TYPES.PHONE:
        break;
      case TYPES.NUMBER:
        break;
      case TYPES.YESNO:
        break;
      case TYPES.FILE:
        break;
      case TYPES.RATING:
        break;
      case TYPES.BUTTON:
        break;
      case TYPES.ADDRESS:
        break;
      case TYPES.SCALE:
        break;
      case TYPES.LIST:
        break;
      default:
        return(<MessageFormComponent element={elementDetails}
          saveElementPropsHandler={this.props.elementDetailsSaveHandler}/>)
    }
  }
  render(){
    const {elementDetailsSaveHandler, elementDetails, toggleControlSettings} = this.props;
    return(
      <section className={`control-properties-section ${elementDetails?'active':''}`}>
        { elementDetails && <div className="back-container">
          <i className="close arrow-left" onClick={toggleControlSettings.bind(null, false)}>
          </i>
        </div>
        }
        { elementDetails &&
          this.getFormhandler(elementDetails)
          // <div>
          //   <OptionsFormComponent 
          //   element={elementDetails}
          //   saveElementPropsHandler={this.props.elementDetailsSaveHandler} />
          // </div>
        }
        {/* <button onClick={elementDetailsSaveHandler.bind(null, elementDetails)}>
          Create
        </button> */}
      </section>
    );
  }
}

export default BotControlSettingsComponent;