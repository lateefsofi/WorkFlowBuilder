import React from 'react';
import { Form } from 'react-bootstrap';

export const SetMinMaxValue = ({ isSetMinMaxNum, minNumValue, maxNumValue, onFieldUpdate }) =>  {
  const validate = () => {
    return ~~maxNumValue<~~minNumValue;
  }
  return (
    <Form.Group check="true" inline="true">
      <Form.Label check="true">
        <Form.Control type="checkbox" checked={isSetMinMaxNum} onChange={e=>onFieldUpdate('isSetMinMaxNum', e.target.checked)} /> Set Minimum & Maximum number
      </Form.Label>
      {
        isSetMinMaxNum &&
        <div className="min-max-value-container">
          <Form.Label> Minimum</Form.Label>
          <Form.Control className="txt-variable-name" type="number"
            onChange={e=>onFieldUpdate('minNumValue', e.target.value)}
            value={minNumValue}
          /> <br/>
          <Form.Label check="true"> Maximum </Form.Label>
          <Form.Control className="txt-variable-name" type="number"
            onChange={e=>onFieldUpdate('maxNumValue', e.target.value)}
            value={maxNumValue}
          />
          {
            validate() && 
            <p className="help-text">
              Maximum value should be greater then Minimum value.
            </p>
          }
        </div>
      }
    </Form.Group>
  );
}

export default SetMinMaxValue;