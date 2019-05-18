/**
 * Title: Login Form.
 * Description: Creates input controls for the Login form
 * Author:    Lateef Sofi
 * Created:   17/11/2018
 * Last Modified: 17/11/2018
 **/

import React from 'react';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';

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
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="herobot@gmail.com" />
                </FormGroup>
                {/* <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group> */}
                  {/* <TextField
                  id="email"
                  label="User Name"
                  value={props.email.value}
                  onChange={props.handleChange('email')}
                  onBlur={props.handleBlurEvent('email')}
                  margin="normal"
                  /> */}
                  {
                      errorCheck('email')
                  }
              </div>
              <div>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" />
                </FormGroup>
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
