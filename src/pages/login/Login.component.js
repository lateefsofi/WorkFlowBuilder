import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import ValidationRules from '../registration/ValidationRules';
import { Validator } from '../../shared/services/Validator.service';
import { ReactForm, UpdateField, SetDirty, SetFormDirtyState, ReactFormValues } from '../../shared/services/ReactForm.service';

import apiCall from '../../shared/services/web-api.service';
import { endPoints } from '../../shared/constants';
import {  showLoader, hideLoader } from '../../store/loader/actionCreator';
import { userLoggedIn } from '../../store/auth/actionCreator';
import { addToLocalStorage } from '../../shared/services/Storage.service';
import './Login.component.scss';
import LoginForm from './LoginForm.component';

class Login extends Component {
  loginForm = {
    email: '',
    password: ''
  };
  Validations = {email: ValidationRules.email};
  state = {
      validationErrors: {},
      form: ReactForm(this.loginForm)
  };

  /**
   * Handle input changes
   */
  handleChange = name => event => {
    const loginForm = UpdateField(this.state.form, name, event.target.value);
    this.setState({form: loginForm});
    this.setState({
        validationErrors: Validator(this.Validations, this.state.form)
    })
  };

  /**
   * Handle blur event for input fields
   */
  handleBlurEvent = name => event => {
      const regForm = SetDirty(this.state.form, name, true);
      this.setState({form: regForm});
      this.setState({
          validationErrors: Validator(this.Validations, this.state.form)
      })
  }

  /**
   * Login form validation and api call initiation handler
   */
  handleFormSubmit = (event) => {
      event.preventDefault();
      const loginForm = SetFormDirtyState(this.state.form, true);
      this.setState({form: loginForm});
      this.setState({
          validationErrors: Validator(this.Validations, this.state.form)
      }, ()=>{
          if(this.state.validationErrors && Object.keys(this.state.validationErrors).length>0){
              return;
          }
          const data = ReactFormValues(loginForm);
          this.LoginApiCall(data);
      });
  }

  LoginApiCall = (data) => {
    this.props.showLoader('Validating your credentials.')
    apiCall('POST', endPoints.LOGIN, data)
      .then((response)=>{
          this.props.hideLoader();
          if(response.status === 200) {
              addToLocalStorage('loginData', {...response.data})
              this.setState({
                form: ReactForm(this.loginForm)
              });
              toast.success('You are logged in successfully.');
              this.props.updateLoginStatus({...response.data});
          }
      })
      .catch(err => {
          this.props.hideLoader();
          if(err && err.response && err.response.data && err.response.data.message) {
              toast.error(err.response.data.message.join(','), 'Error');
          }

      });
  }

  render() {
    return (
        <div className="login-container">
            <LoginForm
              {...this.state.form}
              handleSubmit={this.handleFormSubmit}
              validationErrors={this.state.validationErrors}
              handleChange={this.handleChange}
              handleBlurEvent={this.handleBlurEvent}
            />
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        loader: state.loader
    }
};

const mapDispatchToProps = dispatch => {
    return {
        showLoader: (payload) => dispatch(showLoader(payload)),
        hideLoader: () => dispatch(hideLoader()),
        updateLoginStatus: (payload) => dispatch(userLoggedIn(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
