import React, { Component } from 'react';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';

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
    return list.map((item, index)=>
    <li key={index}>
        <Input 
          type="text"
          placeholder="Option text"
          value={item.value} 
          onChange={e => this.onOptionChangehandler(e, index)}
          />
    </li>);
  }
  render() {
    return(
      <Form className="element-form" onSubmit={()=>this.props.saveElementPropsHandler(this.state.element)}>
        <div className="header">
          <FormGroup>
              {/* <Label for="email">Email</Label> */}
              <Input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="herobot@gmail.com"
                value={this.state.element.heading} 
                onChange={e=>this.onTextChangeHandler(e, 'heading')}
                />
          </FormGroup>
        </div>
        <div>
          <Button type="button" onClick={this.addNewOptionhandler}>+ Add</Button>
        </div>
        <ul>
          {
            this.getOptions(this.state.element.options)
          }
        </ul>
        <div className="actions">
          <Button type="submit">Save</Button>
        </div>
      </Form>
    );
  }
}