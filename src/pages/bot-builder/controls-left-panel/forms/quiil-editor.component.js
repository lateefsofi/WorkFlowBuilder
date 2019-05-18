import React from 'react';
import modules from './quill-tool-bar';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './forms.scss';

export const QuilEditor = ({showVariable, showClose, removeOption, message, placeholder, onQuillTextChangehandler, type, index}) =>
    <div key={index} className="header">
        { showVariable && <button className="btn-secondary variable" type="button">Variable</button>}
        { showClose && <button type="button" className="remove-option" onClick={()=>removeOption(index)}>x</button>}
        <ReactQuill value={message.text}
        modules={modules}
        placeholder={placeholder}
        onChange={text => onQuillTextChangehandler(text, type, index)} />
    </div>