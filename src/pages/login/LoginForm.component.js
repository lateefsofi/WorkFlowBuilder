/**
 * Title: Login Form.
 * Description: Creates input controls for the Login form
 * Author:    Lateef Sofi
 * Created:   17/11/2018
 * Last Modified: 17/11/2018
 **/

import React from 'react';
import { NavLink } from 'react-router-dom';
import { TextField, Button  } from '@material-ui/core';

import { ErrorMessage } from '../../shared/components/errorMessage/ErrorMessage.component';

const LoginForm = (props) => {
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
                  Sign in to your account
              </h3>
              <div>
                  <TextField
                  id="email"
                  label="User Name"
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
              <div className="actions">
                  <NavLink className="link" to="/registration" exact={true}>Not registered?</NavLink>
                  <Button type="submit" variant="contained" color="primary">
                      Login
                  </Button>
              </div>
          </form>
        </div>
    );
}
export default LoginForm;
export { LoginForm };
