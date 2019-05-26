import React from 'react';
import modules from './quill-tool-bar';
import ReactQuill from 'react-quill';
import { DropdownButton, Dropdown } from 'react-bootstrap'

import 'react-quill/dist/quill.snow.css';
import './forms.scss';
const variablesList = ['@name', '@address', '@email'];


export const QuilEditor = ({
    showVariable, 
    showClose,
    removeOption,
    message,
    placeholder,
    onQuillTextChangehandler,
    type,
    index
}) => {
    const variableChangeHandler = variable => onQuillTextChangehandler(`${message.text}${variable}`, variable, type, index)
    const getVariablesList = list => list.map((item, index )=> <Dropdown.Item key={`variable-list-${index}`} onClick={()=>variableChangeHandler(item)}> { item } </Dropdown.Item>)
    return(
        <div key={index} className="header">
            <div className="variable">
                <DropdownButton id="dropdown-basic-button" title="Variable">
                    {
                        getVariablesList(variablesList)
                    }
                </DropdownButton>
            </div>
            {/* { showVariable && <button className="btn-secondary variable" type="button">Variable</button>} */}
            { showClose && <button type="button" className="remove-option" onClick={()=>removeOption(index)}>x</button>}
            <ReactQuill value={message.text}
            modules={modules}
            placeholder={placeholder}
            onChange={text => onQuillTextChangehandler(text, null, type, index)} />
        </div>
    );
}