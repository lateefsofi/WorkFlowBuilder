import React, { Component } from 'react';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import modules from './quill-tool-bar';

import './forms.scss';

export class MessageFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
        element: this.props.element,
    }
    this.onQuillTextChangehandler = this.onQuillTextChangehandler.bind(this);
  }
  onQuillTextChangehandler(text, field) {
    const element = {...this.state.element};
    element[field] = text;
    this.setState({
      element: { ...element }
    })
  }
  onFormSubmitHandler(element) {
    this.props.saveElementPropsHandler(element)
  }
  render() {
    return(
      <Form className="element-form" onSubmit={()=>this.onFormSubmitHandler(this.state.element)}  noValidate>
        <div className="header-title">Add new message</div>
        <div className="header">
          <ReactQuill value={this.state.element.heading}
            modules={modules}
            placeholder={this.state.element.placeholder}
            onChange={text => this.onQuillTextChangehandler(text, 'heading')} />
        </div>
        <div className="actions">
          <Button type="submit" color="primary">Apply</Button>
        </div>
        
      </Form>
    );
  }
}

export default MessageFormComponent;