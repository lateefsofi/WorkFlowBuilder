import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  MessageFormComponent,
  NameFormComponent,
  NumberFormComponent,
  PhoneFormComponent,
  EmailFormComponent,
  YesNoComponent,
  AddressFormComponent
} from './forms';
import { TYPES } from '../../../shared/constants/bot-control-types.constants';
import { setEditData } from '../../../store/bot-builder/actions';

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
        return (<NameFormComponent element={elementDetails}
          saveElementPropsHandler={this.props.elementDetailsSaveHandler}/>)
      case TYPES.EMAIL: EmailFormComponent
        return (<NameFormComponent element={elementDetails}
          saveElementPropsHandler={this.props.elementDetailsSaveHandler}/>)
      case TYPES.PHONE:
        return (<PhoneFormComponent element={elementDetails}
          saveElementPropsHandler={this.props.elementDetailsSaveHandler}/>)
      case TYPES.NUMBER:
        return (<NumberFormComponent element={elementDetails}
          saveElementPropsHandler={this.props.elementDetailsSaveHandler}/>)
      case TYPES.YESNO:
        return (<YesNoComponent element={elementDetails}
          saveElementPropsHandler={this.props.elementDetailsSaveHandler}/>)
      case TYPES.FILE:
        break;
      case TYPES.RATING:
        break;
      case TYPES.BUTTON:
        break;
      case TYPES.ADDRESS: 
        return (<AddressFormComponent element={elementDetails}
         saveElementPropsHandler={this.props.elementDetailsSaveHandler}/>)
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
    const { elementDetails, toggleControlSettings } = this.props;
    return(
      <section className={`control-properties-section ${elementDetails?'active':''}`}>
        { elementDetails && <div className="back-container">
          <i className="close arrow-left" onClick={toggleControlSettings.bind(null, false)}>
          </i>
        </div>
        }
        { this.props.elementDetails &&
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


const mapStateToProps = state => {
  return {
    elementDetails: state.BotBuilderReducer.selectedElement
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setEditData: (payload) => dispatch(setEditData(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BotControlSettingsComponent);