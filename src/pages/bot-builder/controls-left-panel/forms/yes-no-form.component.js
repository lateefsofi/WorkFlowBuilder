import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { QuilEditor } from './quiil-editor.component';
import { cleanUnusedvariables, elementTextChange } from './utils';
import SaveAnswerInVariable from './common/save-answer-to-variable';

import './forms.scss';

export class YesNoComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isFormDirty: false,
      element: this.props.element,
    }
    this.onQuillTextChangehandler = this.onQuillTextChangehandler.bind(this);
    this.onFieldUpdate = this.onFieldUpdate.bind(this);
  }
  onQuillTextChangehandler(text, variable) {
    const element = elementTextChange({...this.state.element}, text, variable) ;
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
    element = cleanUnusedvariables(element);
    this.props.saveElementPropsHandler(element);
  }
  getOptions(options) {
    return (
      options.map((option, index) => <li key={index}>
        <div className="item">  { option.value } </div>
      </li>)
    );
  }

  onFieldUpdate(field, val) {
    const element = {...this.state.element};
    element[field]= val;
    this.setState({
      element
    });
  }
  
  render() {
    return(
      <Form className="element-form" onSubmit={e=>this.onFormSubmitHandler(e, this.state.element)}  noValidate>
        <div className="header-title">Yes/No block</div>
        <QuilEditor
          showVariable={true}
          message={this.state.element}
          placeholder={this.state.element.placeholder}
          onQuillTextChangehandler={this.onQuillTextChangehandler}/>
          { this.state.isFormDirty && (!this.state.element.text || this.state.element.text===window.quillDefaultText) &&  <p className="help-text">Please enter your question.</p>}
        <ul className="option-container">
          { this.getOptions(this.state.element.options) }
        </ul>
        <div className="check-box-container">
        <SaveAnswerInVariable 
          {...this.state.element}
          onFieldUpdate={this.onFieldUpdate}
        />
        <Form.Group check="true" inline="true">
          <Form.Label check="true">
            <Form.Control type="checkbox" checked={this.state.element.isAssignToLeadQualificationStage} onChange={e=>this.onCheckBoxChange('isAssignToLeadQualificationStage', e)} /> Assign to Lead Qualification Stage
          </Form.Label>
        </Form.Group>
        </div>
        <div className="actions">
          <Button type="submit" color="primary">Apply</Button>
        </div>
        
      </Form>
    );
  }
}

export default YesNoComponent;