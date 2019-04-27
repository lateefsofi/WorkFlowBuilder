import React, { Component } from 'react';

import './forms.scss';


export class OptionsFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
        element: this.props.element
    }
    this.addNewOptionhandler = this.addNewOptionhandler.bind(this);
  }

  onTextChangeHandler(e, field) {
    const element = {...this.state.element};
    element[field] = e.target.value;
    this.setState({
      element: { ...element }
    })
  }
  onOptionChangehandler(e, index) {
    const element = {...this.state.element};
    element.options[index].value = e.target.value;
    this.setState({
      element: { ...element }
    })
  }
  addNewOptionhandler() {
    debugger
    const element = {...this.state.element};
    element.options.push(
      {value: "New option", next: null}
    );
    this.setState({
      element: { ...element }
    })
  }
  getOptions(list) {
    return list.map((item, index)=><li key={index}><input type="text" value={item.value} onChange={e => this.onOptionChangehandler(e, index)}/></li>);
  }
  render() {
    return(
      <form className="element-form" onSubmit={()=>this.props.saveElementPropsHandler(this.state.element)}>
        <div className="header">
          <input type="text" value={this.state.element.heading} onChange={e=>this.onTextChangeHandler(e, 'heading')}/>
        </div>
        <div>
          <button type="button" onClick={this.addNewOptionhandler}>+ Add</button>
        </div>
        <ul>
          {
            this.getOptions(this.state.element.options)
          }
        </ul>
        <div className="actions">
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}