import React from 'react';
import { Form, Button } from 'react-bootstrap';
export const DisableNonBusinessEmails = ({isDisableNonBusinessEmails, nonBusinessEmailTypes, onFieldUpdate}) => {
  const toggleFileTypeSelection = nonBusinessEmailType => {
    const nonBusinessEmailTypesCopy = {...nonBusinessEmailTypes};
    nonBusinessEmailTypesCopy[nonBusinessEmailType] = !nonBusinessEmailTypesCopy[nonBusinessEmailType];
    onFieldUpdate('nonBusinessEmailTypes', nonBusinessEmailTypesCopy);
  }

  const getNonBusinessEmailTypes = () =>
    Object.keys(nonBusinessEmailTypes).map((nonBusinessEmailType, idx) => 
      <Button className="pills" key={`allowed-file-type${idx}`} onClick={()=>toggleFileTypeSelection(nonBusinessEmailType)} type="button">
        { nonBusinessEmailType }
        {
          nonBusinessEmailTypes[nonBusinessEmailType] &&
          <span className="checked-icon"></span>
        }
      </Button>
    )

  return (
    <Form.Group check="true" inline="true">
      <Form.Label check="true">
        <Form.Control type="checkbox" checked={isDisableNonBusinessEmails} onChange={e=>onFieldUpdate('isDisableNonBusinessEmails', e.target.checked)} /> Disable Non-Business Emails
      </Form.Label>
      {
        isDisableNonBusinessEmails && 
        <div className="allowed-file-types-conatiner">
          { getNonBusinessEmailTypes() }
        </div>
      }
    </Form.Group>
  );
}
  
export default DisableNonBusinessEmails;