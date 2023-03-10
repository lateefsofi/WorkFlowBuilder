import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { QuilEditor } from './quiil-editor.component';
import { cleanUnusedvariables } from './utils';

import './forms.scss';

export class MessageFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
        element: this.props.element,
        isFormDirty: false
    }
    this.onQuillTextChangehandler = this.onQuillTextChangehandler.bind(this);
    this.addNewMessage = this.addNewMessage.bind(this);
    this.removeOption = this.removeOption.bind(this);
    this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this);
  }
  onQuillTextChangehandler(text, variable, field, index) {
    const element = {...this.state.element};
    element[field][index].text= text;
    if(variable) {
      if(!element[field][index].variables) {
        element[field][index].variables = [variable];
      } else {
        element[field][index].variables.push(variable);
      }
    }
    this.setState({
      element: { ...element }
    })
  }
  onFormSubmitHandler(e, element) {
    e.preventDefault();
    let isValid = true;
    element.messages.forEach(element => {
      if(!element.text || element.text===window.quillDefaultText) {
        isValid = false;
      }
    });
    if(!isValid) {
      this.setState({
        isFormDirty: true
      })
    } else {
      element.messages.forEach(message => {
        message = cleanUnusedvariables(message);
      })
      this.props.saveElementPropsHandler(element)
    }
  }

  addNewMessage() {
    const element = {...this.state.element};
    element.messages.push({text: ""});
    this.setState({
      element: { ...element }
    })
  }
  removeOption(index) {
    const element = JSON.parse(JSON.stringify(this.state.element));
    element.messages.splice(index, 1);
    this.setState({
      element: { ...element }
    })
  }
  
  render() {
    const getMessageNodes = messages => (messages.map((message, index )=> 
      <React.Fragment key={index}>
        <QuilEditor
        showVariable={true}  
        showClose={messages.length>1}
        removeOption={this.removeOption}
        message={message}
        placeholder={this.state.element.placeholder}
        onQuillTextChangehandler={this.onQuillTextChangehandler}
        type="messages"
        index={index}/>
        { this.state.isFormDirty && (!message.text || message.text===window.quillDefaultText) &&  <p className="help-text">Please enter message.</p>}
      </React.Fragment>
    ));
    return(
      <form className="element-form" onSubmit={e=>this.onFormSubmitHandler(e,this.state.element)}  noValidate>
        <div className="header-title">Add new message</div>
        { getMessageNodes(this.state.element.messages) }
        {/* <div className="header">
          <ReactQuill value={this.state.element.heading}
            modules={modules}
            placeholder={this.state.element.placeholder}
            onChange={text => this.onQuillTextChangehandler(text, 'heading')} />
        </div> */}
        <div className="add-new-message-container">
          <span>Add new Message</span>
          <button type="button" onClick={this.addNewMessage}>
            <span className="centered-element">+</span>
          </button>
        </div>
        <div className="actions">
          <Button type="submit" color="primary">Apply</Button>
        </div>
        
      </form>
    );
  }
}

export default MessageFormComponent;