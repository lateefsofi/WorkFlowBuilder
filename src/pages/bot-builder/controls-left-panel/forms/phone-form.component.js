import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { QuilEditor } from './quiil-editor.component';
import { cleanUnusedvariables, elementTextChange } from './utils';
import SaveAnswerInVariable from './common/save-answer-to-variable';
import CustomiseValidationMessage from './common/customise-validation-message';
import DefaultContryCode from './common/default-country-code';
import { getCountries } from '../../../../store/meta-data/actions';

import './forms.scss';

export class PhoneFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isFormDirty: false,
      element: this.props.element,
    }
    this.onQuillTextChangehandler = this.onQuillTextChangehandler.bind(this);
    this.onFieldUpdate = this.onFieldUpdate.bind(this);
    this.setSelectedCountry = this.setSelectedCountry.bind(this);
  }

  componentDidMount() {
    this.props.getCountries();
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
    this.props.saveElementPropsHandler(element)
    console.log("Element: ", element)
  }

  onFieldUpdate(field, val) {
    const element = {...this.state.element};
    element[field]= val;
    this.setState({
      element
    });
  }

  setSelectedCountry(selectedCountry) {
    this.setState({
      selectedCountry
    })
  }
  
  render() {
    console.log("countries: ", this.props.countries)
    return(
      <Form className="element-form" onSubmit={e=>this.onFormSubmitHandler(e, this.state.element)}  noValidate>
        <div className="header-title">Phone block</div>
        <QuilEditor
          showVariable={true}
          message={this.state.element}
          placeholder={this.state.element.placeholder}
          onQuillTextChangehandler={this.onQuillTextChangehandler}/>
          { this.state.isFormDirty && (!this.state.element.text || this.state.element.text===window.quillDefaultText) &&  <p className="help-text">Please enter your question.</p>}
        <div className="check-box-container">
        <SaveAnswerInVariable 
          {...this.state.element}
          onFieldUpdate={this.onFieldUpdate}
        />
        <DefaultContryCode 
          countries={this.props.countries}
          selectedCountry={this.state.selectedCountry}
          setSelectedCountry={this.setSelectedCountry}
          {...this.state.element}
          onFieldUpdate={this.onFieldUpdate}
        />
        <CustomiseValidationMessage 
          {...this.state.element}
          onFieldUpdate={this.onFieldUpdate}
        />
        </div>
        <div className="actions">
          <Button type="submit" color="primary">Apply</Button>
        </div>
        
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  countries: state.MetaDataReducer.countries
})

export default connect(mapStateToProps, { getCountries })(PhoneFormComponent);