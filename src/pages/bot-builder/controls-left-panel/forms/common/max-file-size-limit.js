import React from 'react';
import { Form } from 'react-bootstrap';

export const MaxFileSizeLimit = ({ isEnableFileSizeLimit, maxFileSizeLimit, systemFileSizeLimit, onFieldUpdate }) =>  {
  const validate = () => ~~systemFileSizeLimit<~~maxFileSizeLimit;
  const validNumCheck = () => ~~maxFileSizeLimit<=0;
  return (
    <Form.Group check="true" inline="true">
      <Form.Label check="true">
        <Form.Control type="checkbox" checked={isEnableFileSizeLimit} onChange={e=>onFieldUpdate('isEnableFileSizeLimit', e.target.checked)} /> Enable File Size Limit
      </Form.Label>
      {
        isEnableFileSizeLimit &&
        <div className="max-file-limit-container">
          <Form.Label> Maximum File Limit</Form.Label>
          <Form.Control className="txt-variable-name" type="number"
            onChange={e=>onFieldUpdate('maxFileSizeLimit', e.target.value)}
            value={maxFileSizeLimit}
          />
          <span>MB</span>
          <p className="message-text">
            The System allows maximum <b>{systemFileSizeLimit} MB</b> File Limit.
          </p>
          {
            validate() && 
            <p className="help-text">
              Maximum file size limit should not exceeede system file size limit.
            </p>
          }
          {
            validNumCheck() && 
            <p className="help-text">
              File size should be greater than 0.
            </p>
          }    
        </div>
      }
      
    </Form.Group>
  );
}

export default MaxFileSizeLimit;