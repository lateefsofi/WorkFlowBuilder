import React, { Component } from 'react';
import './controls-left-panel.component.scss';

const controlsData = [
  { icon: 'email', name: 'Email', hasOptions: true },
  { icon: 'email', name: 'Email', hasOptions: false },
  { icon: 'email', name: 'Phone', hasOptions: false },
  { icon: 'email', name: 'Number', hasOptions: false }
]
const additionalBlocksData = [
  { icon: '', name: 'Conditional logic'},
  { icon: '', name: 'Goals'},
  { icon: '', name: 'Stripe'},
  { icon: '', name: 'Appointmant'},
]
export class ControlsLeftPanel extends Component {
  constructor (props){
    super(props);
    this.state = {
      isShowControlsSettings: false
    }
  }
  toggleControlSettings(detailsState) {
    debugger
    this.setState({
      isShowControlsSettings: detailsState
    })
  }
  render() {
    const getElements = elementsList =>
      elementsList.map((element, index) => <li key={index} role="button" tabIndex="0" onClick={this.toggleControlSettings.bind(this, true, element)}>
        <i className={element.icon}></i>
        <span className="name"> { element.name } </span>
      </li>)
    const additionalBlock = elementsList =>
      elementsList.map((element, index)=>
      <button>
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
        <section className={`control-properties-section ${this.state.isShowControlsSettings?'active':''}`}>
          <i className="close arrow-left" onClick={this.toggleControlSettings.bind(this, false)}>
          </i>
        </section>
      </section>
    );
  }
}