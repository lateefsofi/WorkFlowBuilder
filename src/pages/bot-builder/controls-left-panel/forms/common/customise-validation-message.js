import React from 'react';
import { Form } from 'react-bootstrap';

export const CustomiseValidationMessage = ({ validationMessages, isCustValidationMsg, onFieldUpdate }) => {
  const setValidationMessage = (field, val) => {
    const updatedValMessages = { ...validationMessages }
    updatedValMessages[field].text = val;
    onFieldUpdate('validationMessages', updatedValMessages);
  }

  const getFields = () =>
    Object.keys(validationMessages).map((valMsg, idx) => 
      <Form.Control key={`valMsg${idx}`} className="txt-variable-name" type="text"
        onChange={e=>setValidationMessage(valMsg, e.target.value)}
        placeholder={validationMessages[valMsg].placeholder}
        value={validationMessages[valMsg].text}
      />
    );

  return (
    <Form.Group className="cust-val-msg" check="true" inline="true">
      <Form.Label check="true">
        <Form.Control type="checkbox" checked={isCustValidationMsg} onChange={e=>onFieldUpdate('isCustValidationMsg', e.target.checked)} /> Customise validation message
      </Form.Label>
      { isCustValidationMsg && getFields() }
    </Form.Group>
  );
}

export default CustomiseValidationMessage;