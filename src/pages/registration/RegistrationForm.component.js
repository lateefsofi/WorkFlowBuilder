/**
 * Title: User registration Form.
 * Description: Creates input controls for the registration form
 * Author:    Lateef Sofi
 * Created:   31/10/2018
 * Last Modified: 11/11/2018
 **/

import React from 'react';
import { NavLink } from 'react-router-dom';
import { TextField, Button  } from '@material-ui/core';

import { ErrorMessage } from '../../shared/components/errorMessage/ErrorMessage.component';

const RegForm = (props) => {
    const errorCheck = (field) => {
        if(!props[field].isDirty) {
            return null;
        }
        return (<ErrorMessage errors={props.validationErrors} field={field}/>)
    }
    return (
        <div className="login-container">
            <form  noValidate autoComplete="off" onSubmit={props.handleSubmit}>
                <h3>
                    Sign up to create your account
                </h3>
                <div>
                    <TextField
                    id="firstName"
                    label="First Name"
                    value={props.firstName.value}
                    onChange={props.handleChange('firstName')}
                    onBlur={props.handleBlurEvent('firstName')}
                    margin="normal"
                    />
                    {
                        errorCheck('firstName')
                    }
                </div>
                <div>
                    <TextField
                    id="lastName"
                    label="Last Name"
                    value={props.lastName.value}
                    onChange={props.handleChange('lastName')}
                    onBlur={props.handleBlurEvent('lastName')}
                    margin="normal"
                    /> 
                    {
                        errorCheck('lastName')
                    }
                </div>
                <div>
                    <TextField
                    id="email"
                    label="email"
                    value={props.email.value}
                    onChange={props.handleChange('email')}
                    onBlur={props.handleBlurEvent('email')}
                    margin="normal"
                    /> 
                    {
                        errorCheck('email')
                    }
                </div>
                <div>
                    <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value={props.password.value}
                    onChange={props.handleChange('password')}
                    onBlur={props.handleBlurEvent('password')}
                    margin="normal"
                    /> 
                    {
                        errorCheck('password')
                    }
                </div>
                <div>
                    <TextField
                    id="confirm-password"
                    label="Confirm Password"
                    type="password"
                    value={props.confirmPassword.value}
                    onChange={props.handleChange('confirmPassword')}
                    onBlur={props.handleBlurEvent('confirmPassword')}
                    margin="normal"
                    /> 
                    <ErrorMessage errors={props.validationErrors} field='confirmPassword'/>
                </div>
                <div className="actions">
                    <NavLink className="link" to="/" exact={true}>Already registered?</NavLink>
                    <Button type="submit" variant="contained" color="primary">
                        Sign up
                    </Button>
                </div>
            </form>
        </div>
    );
}

export { RegForm };