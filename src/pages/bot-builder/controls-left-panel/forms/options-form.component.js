import React, { Component } from 'react';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './forms.scss';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'link'],
    [ 
     {'indent': '-1'}, {'indent': '+1'}]
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}


export class OptionsFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
        element: this.props.element,
        text: ''
    }
    this.addNewOptionhandler = this.addNewOptionhandler.bind(this);
    this.onQuillTextChangehandler = this.onQuillTextChangehandler.bind(this);
  }

  onTextChangeHandler(e, field) {
    const element = {...this.state.element};
    element[field] = e.target.value;
    this.setState({
      element: { ...element }
    })
  }
  onQuillTextChangehandler(text, field) {
    const element = {...this.state.element};
    element[field] = text;
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
      <Form className="element-form" onSubmit={()=>this.props.saveElementPropsHandler(this.state.element)}  noValidate>
        <div className="header">
          <ReactQuill value={this.state.element.heading}
            modules={modules}
            onChange={text => this.onQuillTextChangehandler(text, 'heading')} />
          {/* <FormGroup>
              <Input 
                name="email" 
                id="email" 
                placeholder="herobot@gmail.com"
                value={this.state.element.heading} 
                onChange={e=>this.onTextChangeHandler(e, 'heading')}
                />
          </FormGroup> */}
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