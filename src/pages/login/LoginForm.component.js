/**
 * Title: Login Form.
 * Description: Creates input controls for the Login form
 * Author:    Lateef Sofi
 * Created:   17/11/2018
 * Last Modified: 08/06/2018
 **/

import React from 'react';
import { Form, Button } from 'react-bootstrap';

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
          <Form  noValidate autoComplete="off" onSubmit={props.handleSubmit}>
              <h3>
                  Sign in to your account
              </h3>
              <div>
                <Form.Group>
                    <Form.Label >Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        name="email" 
                        id="email"
                        onChange={props.handleChange('email')}
                        onBlur={props.handleBlurEvent('email')}/>
                </Form.Group>
                  {
                    errorCheck('email')
                  }
              </div>
              <div>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        id="password"
                        onChange={props.handleChange('password')}
                        onBlur={props.handleBlurEvent('password')} />
                </Form.Group>
                  {
                    errorCheck('password')
                  }
              </div>
              <div className="actions">
                  {/* <NavLink className="link" to="/registration" exact={true}>Not registered?</NavLink> */}
                  <Button type="submit" variant="contained" color="primary">
                      Login
                  </Button>
              </div>
          </Form>
        </div>
    );
}
export default LoginForm;
export { LoginForm };
