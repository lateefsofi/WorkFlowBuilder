/**
 * Title: User Account registration.
 * Description: Sign up user with minimal information.
 * Author:    Lateef Sofi
 * Created:   31/10/2018
 * Last Modified: 11/11/2018
 **/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RegForm } from './RegistrationForm.component';
import { Validations } from './ValidationRules';
import { Validator } from '../../shared/services/Validator.service';
import { ReactForm, UpdateField, SetDirty, SetFormDirtyState, ReactFormValues } from '../../shared/services/ReactForm.service';
import apiCall from '../../shared/services/web-api.service';
import { endPoints } from '../../shared/constants';
import {  showLoader, hideLoader } from '../../store/loader/actionCreator';


class Registration extends Component {
    registrationForm = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    state = {
        validationErrors: {},
        form: ReactForm(this.registrationForm)
    };

    /**
     * Handle input changes
     */
    handleChange = name => event => {
        const regForm = UpdateField(this.state.form, name, event.target.value);
        this.setState({form: regForm});
        this.setState({
            validationErrors: Validator(Validations, this.state.form)
        })
    };
    /**
     * Handle blur event for input fields
     */
    handleBlurEvent = name => event => {
        const regForm = SetDirty(this.state.form, name, true);
        this.setState({form: regForm});
        this.setState({
            validationErrors: Validator(Validations, this.state.form)
        })
    }
    /**
     * Registration form validation and api call initiation handler
     */
    handleFormSubmit = (event) => {
        event.preventDefault();
        const regForm = SetFormDirtyState(this.state.form, true);
        this.setState({form: regForm});
        this.setState({
            validationErrors: Validator(Validations, this.state.form)
        }, ()=>{
            if(this.state.validationErrors && Object.keys(this.state.validationErrors).length>0){
                return;
            }
            const data = ReactFormValues(regForm);
            this.registerApiCall(data);
        });
    }

    /**
     * Register a new Account API call handler
     * @param {*} data
     */
    registerApiCall(data) {
        this.props.showLoader('Creating your account.')
        apiCall('POST', endPoints.REGISTER, data)
            .then((response)=>{
                this.props.hideLoader();
                if(response.status === 201) {
                    this.setState({
                      form: ReactForm(this.registrationForm)
                    });
                    toast.success('Your account has been created successfully.');
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
        return(
            <div>

                <RegForm
                    {...this.state.form}
                    handleSubmit={this.handleFormSubmit}
                    validationErrors={this.state.validationErrors}
                    handleChange={this.handleChange}
                    handleBlurEvent={this.handleBlurEvent}
                />
            </div>
        )
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
        hideLoader: () => dispatch(hideLoader())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
