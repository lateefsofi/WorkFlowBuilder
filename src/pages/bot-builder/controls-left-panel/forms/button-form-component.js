import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { QuilEditor } from './quiil-editor.component';
import { cleanUnusedvariables, elementTextChange } from './utils';
import SaveAnswerInVariable from './common/save-answer-to-variable';

import './forms.scss';

export class ButtonComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isFormDirty: false,
      element: { ...this.props.element},
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
  onButtonTextChange(e, index) {
    const options = [...this.state.element.options]
    options[index].value = e.target.value;
    this.setState({
      element: { ...this.state.element, options} 
    })
  }
  onCheckBoxChange(field, e) {
    const element = {...this.state.element};
    element[field]= e.target.checked;
    this.setState({
      element
    })
  }

  addNewButton() {
    const options = [...this.state.element.options]
    options.push({
      value: '', next: null
    });
    this.setState({
      element: { ...this.state.element, options} 
    })
  }
  deleteButton(index) {
    const options = [...this.state.element.options];
    if(options.length === 1) {
      options[index].value = '';
    } else {
      options.splice(index, 1);
    }
    this.setState({
      element: { ...this.state.element, options} 
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
        <div className="btn-container"> 
          <input type="text" value={option.value} placeholder="Click to edit..." onChange={e=>this.onButtonTextChange(e, index)}/>
          <Button type="button" onClick={()=>this.deleteButton(index)}>
            <i className="delete-icon"></i>
          </Button>
        </div>
      </li>)
    );
  }

  getAddNewButton() {
    return (<div className="add-new-message-container">
      <span>Add new Button</span>
      <button type="button" onClick={this.addNewButton.bind(this)}>
        <span className="centered-element">+</span>
      </button>
    </div>);
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
        <div className="header-title">Buttons block</div>
        <QuilEditor
          showVariable={true}
          message={this.state.element}
          placeholder={this.state.element.placeholder}
          onQuillTextChangehandler={this.onQuillTextChangehandler}/>
          { this.state.isFormDirty && (!this.state.element.text || this.state.element.text===window.quillDefaultText) &&  <p className="help-text">Please enter your question.</p>}
        <ul className="option-container">
          { this.getOptions(this.state.element.options) }
        </ul>
        {
          this.getAddNewButton()
        }
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

export default ButtonComponent;