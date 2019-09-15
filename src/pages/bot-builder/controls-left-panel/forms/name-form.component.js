import React, { Component } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

import { QuilEditor } from './quiil-editor.component';
import { cleanUnusedvariables } from './utils';

import './forms.scss';

export class NameFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isFormDirty: false,
        element: this.props.element,
    }
    this.onQuillTextChangehandler = this.onQuillTextChangehandler.bind(this);
    this.onToggleFallBackValue = this.onToggleFallBackValue.bind(this);
  }
  onQuillTextChangehandler(text, variable) {
    const element = {...this.state.element};
    element.text= text;
    if(variable) {
      if(!element.variables) {
        element.variables = [variable];
      } else {
        element.variables.push(variable);
      }
    }
    this.setState({
      element
    })
  }
  onCheckBoxChange(field, e) {
    const element = {...this.state.element};
    element[field]= e.target.checked;
    this.setState({
      element
    })
  }
  onFormSubmitHandler(e, element) {
    e.preventDefault();
    if(!element.text || element.text === window.quillDefaultText) {
      this.setState({
        isFormDirty: true
      })
      return;
    }
    element = cleanUnusedvariables(element);
    this.props.saveElementPropsHandler(element)
  }
  onToggleFallBackValue() {
    const element = {...this.state.element};
    element.isAddFallBackValue = !element.isAddFallBackValue;
    this.setState({
      element
    });
  }
  
  render() {
    return(
      <Form className="element-form" onSubmit={e=>this.onFormSubmitHandler(e, this.state.element)}  noValidate>
        <div className="header-title">Name block</div>
        <QuilEditor
          showVariable={true}
          message={this.state.element}
          placeholder={this.state.element.placeholder}
          onQuillTextChangehandler={this.onQuillTextChangehandler}/>
          { this.state.isFormDirty && (!this.state.element.text || this.state.element.text===window.quillDefaultText) &&  <p className="help-text">Please enter you question.</p>}
        <div className="check-box-container">
        <Form.Group check="true" inline="true">
          <Form.Label check="true">
            <Form.Control type="checkbox" checked={this.state.element.isSaveInVariable} onChange={e=>this.onCheckBoxChange('isSaveInVariable', e)} /> Save Answer to a Variable
          </Form.Label>
          {
            this.state.element.isSaveInVariable &&
            <div className="variable-container">
              <span className="atSymbol">@</span>
              <Form.Control className="txt-variable-name" type="text" placeholder="Variable Name" />
              <Button className="create-action" type="button" color="primary">Create</Button>
              <Button className="add-fallback-val-action" onClick={this.onToggleFallBackValue} type="button" color="primary">Add Fallback value</Button>
              {
                this.state.element.isAddFallBackValue &&
                <Form.Control type="text" placeholder="Fallback Value" />
              }
            </div>
          }
        </Form.Group>
        </div>
        <div className="actions">
          <Button type="submit" color="primary">Apply</Button>
        </div>
        
      </Form>
    );
  }
}

export default NameFormComponent;