/**
 * Title: User registration Validation rules.
 * Description: Registration form will be validated with these validations before submitting.
 * Author:    Lateef Sofi.
 * Created:   31/10/2018.
 * Last Modified: 11/11/2018.
 **/

import { patterns } from '../../shared/constants/patterns.constants';

const Validations = {
    message: {
        required: {
            value: true,
            message: 'Please add a message.'
        },
        minLength: {
            value: 2,
            message: 'Message should be more than 2 characters.'
        },
        maxLength: {
            value: 1000,
            message: 'Message should not exceede 1000 characters.'
        }
    },
    option: {
        required: {
            value: true,
            message: 'Please add option text.'
        },
        minLength: {
            value: 2,
            message: 'Message should be more than 2 characters.'
        },
        maxLength: {
            value: 100,
            message: 'Message should not exceede 100 characters.'
        }
    },
    email: {
        required: {
            value: true,
            message: 'Email ID is required.'
        },
        maxLength: {
            value: 50,
            message: 'Email ID should not exceede 50 characters.'
        },
        pattern: {
            value: patterns.EMAIL,
            message: 'Please provide a valid email ID.'
        }
    }
}

export default Validations;