import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { QuilEditor } from './quiil-editor.component';

import './forms.scss';

export class NumberFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isFormDirty: false,
      element: this.props.element,
    }
    this.onQuillTextChangehandler = this.onQuillTextChangehandler.bind(this);
  }
  onQuillTextChangehandler(text) {
    const element = {...this.state.element};
    element.text= text;
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
    if(!element.text || element.text===window.quillDefaultText) {
      this.setState({
        isFormDirty: true
      })
      return;
    }
    this.props.saveElementPropsHandler(element)
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
          { this.state.isFormDirty && (!this.state.element.text || this.state.element.text===window.quillDefaultText) &&  <p className="help-text">Please enter your question.</p>}
        <div className="check-box-container">
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" checked={this.state.element.saveInVariable} onChange={e=>this.onCheckBoxChange('saveInVariable', e)} /> Save Answer to a Variable
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" checked={this.state.element.custValidationMsg} onChange={e=>this.onCheckBoxChange('custValidationMsg', e)} /> Customise validation message
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" checked={this.state.element.setMinMaxNum} onChange={e=>this.onCheckBoxChange('setMinMaxNum', e)} /> Set Minimum & Maximum number
          </Label>
        </FormGroup>
        </div>
        <div className="actions">
          <Button type="submit" color="primary">Apply</Button>
        </div>
        
      </Form>
    );
  }
}

export default NumberFormComponent;