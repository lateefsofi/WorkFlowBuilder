import React from 'react';
import './ErrorMessage.component.scss';

const ErrorMessage = (props) => {
    if(props.errors && props.errors[props.field]) {     
        return <p className='error'> { props.errors[props.field] } </p>
    } else {
        return null;
    }
}

export { ErrorMessage };