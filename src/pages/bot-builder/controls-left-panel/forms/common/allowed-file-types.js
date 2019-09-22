import React from 'react';
import { Form, Button } from 'react-bootstrap';

export const AllowedFileTypes = ({isFileUploadValidation, fileTypes, onFieldUpdate}) => {
  const toggleFileTypeSelection = fileType => {
    const filetypesCopy = {...fileTypes};
    filetypesCopy[fileType] = !filetypesCopy[fileType];
    onFieldUpdate('fileTypes', filetypesCopy);
  }

  const getFileTypeElements = () =>
    Object.keys(fileTypes).map((fileType, idx) => 
      <Button className="pills" key={`allowed-file-type${idx}`} onClick={()=>toggleFileTypeSelection(fileType)} type="button">
        { fileType }
        {
          fileTypes[fileType] &&
          <span className="checked-icon"></span>
        }
      </Button>
    )

  return (
    <Form.Group check="true" inline="true">
      <Form.Label check="true">
        <Form.Control type="checkbox" checked={isFileUploadValidation} onChange={e=>onFieldUpdate('isFileUploadValidation', e.target.checked)} /> Set File Upload Validation
      </Form.Label>
      {
        isFileUploadValidation && 
        <div className="allowed-file-types-conatiner">
          { getFileTypeElements() }
        </div>
      }
    </Form.Group>
  );
}
  
export default AllowedFileTypes;