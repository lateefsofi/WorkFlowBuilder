import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { QuilEditor } from './quiil-editor.component';
import { cleanUnusedvariables, elementTextChange } from './utils';

import './forms.scss';

export class ListFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isFormDirty: false,
      element: this.props.element,
      listItems: (this.props.element.listItems || []).join('\n')
    }
    this.onQuillTextChangehandler = this.onQuillTextChangehandler.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }
  onQuillTextChangehandler(text, variable) {
    const element = elementTextChange({...this.state.element}, text, variable) ;
    this.setState({
      element
    })
  }

  onTextChange(e) {
    const element = { ...this.state.element };
    element.listItems = e.target.value.split("\n");
    this.setState({
      element,
      listItems: e.target.value
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
    this.props.saveElementPropsHandler(element)
    console.log("Element: ", element)
  }
  scaleSteps(steps) {
    return steps.map((item, i) => <option key={`scale-step-${i}`} value={item}> { item } </option>)
  }
  
  render() {
    return(
      <Form className="element-form" onSubmit={e=>this.onFormSubmitHandler(e, this.state.element)}  noValidate>
        <div className="header-title">Drop Down block</div>
        <QuilEditor
          showVariable={true}
          message={this.state.element}
          placeholder={this.state.element.placeholder}
          onQuillTextChangehandler={this.onQuillTextChangehandler}/>
          { this.state.isFormDirty && (!this.state.element.text || this.state.element.text===window.quillDefaultText) &&  <p className="help-text">Please enter your question.</p>}
        <div className="check-box-container">
        <Form.Group>
          <Form.Label>Add/Paste your list items here</Form.Label>
          <Form.Control as="textarea" rows="3" value={this.state.listItems} onChange={this.onTextChange}/>
        </Form.Group>
        <Form.Group check="true" inline="true">
          <Form.Label check="true">
            <Form.Control type="checkbox" checked={this.state.element.isEenableSearch} onChange={e=>this.onCheckBoxChange('isEenableSearch', e)} /> Enable Search
          </Form.Label>
        </Form.Group>
        <Form.Group check="true" inline="true">
          <Form.Label check="true">
            <Form.Control type="checkbox" checked={this.state.element.isEnableMultiSelect} onChange={e=>this.onCheckBoxChange('isEnableMultiSelect', e)} /> Enable Multiple Selection
          </Form.Label>
        </Form.Group>
        <Form.Group check="true" inline="true">
          <Form.Label check="true">
            <Form.Control type="checkbox" checked={this.state.element.isSaveInVariable} onChange={e=>this.onCheckBoxChange('isSaveInVariable', e)} /> Save Answer to a Variable
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

export default ListFormComponent;