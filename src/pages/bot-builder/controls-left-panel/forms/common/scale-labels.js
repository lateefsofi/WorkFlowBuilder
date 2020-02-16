import React from 'react';
import { Form } from 'react-bootstrap';

export const ScaleLabels = ({ isEnableLabels, leftLabel, rightLabel, onFieldUpdate }) =>  {
  return (
    <Form.Group check="true" inline="true">
      <Form.Label check="true">
        <Form.Control type="checkbox" checked={isEnableLabels} onChange={e=>onFieldUpdate('isEnableLabels', e.target.checked)} /> Enable Labels
      </Form.Label>
      {
        isEnableLabels &&
        <div className="scale-labels-container">
          <Form.Label> Left</Form.Label>
          <Form.Control className="txt-variable-name" type="text"
            onChange={e=>onFieldUpdate('leftLabel', e.target.value)}
            value={leftLabel}
          /> <br/>  
          <Form.Label> Right</Form.Label>
          <Form.Control className="txt-variable-name" type="text"
            onChange={e=>onFieldUpdate('rightLabel', e.target.value)}
            value={rightLabel}
          />
        </div>
      }
      
    </Form.Group>
  );
}

export default ScaleLabels;