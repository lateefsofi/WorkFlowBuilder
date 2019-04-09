/**
 * Title: User registration Validation rules.
 * Description: Registration form will be validated with these validations before submitting.
 * Author:    Lateef Sofi.
 * Created:   31/10/2018.
 * Last Modified: 11/11/2018.
 **/

 import { patterns } from '../../shared/constants';

const Validations = {
    firstName: {
        required: {
            value: true,
            message: 'First name is required.'
        },
        minLength: {
            value: 3,
            message: 'First name should be more than 3 characters.'
        },
        maxLength: {
            value: 50,
            message: 'First name should not exceede 50 characters.'
        }
    },
    lastName: {
        required: {
            value: false
        },
        maxLength: {
            value: 50,
            message: 'Last name should not exceede 50 characters.'
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
    },
    password: {
        required: {
            value: true,
            message: 'Password is required.'
        },
        minLength: {
            value: 6,
            message: 'Password should be more than 6 characters.'
        },
        maxLength: {
            value: 50,
            message: 'Password should not exceede 50 characters.'
        }
    },
    confirmPassword: {
        compare: {
            value: 'password',
            message: 'Password mismatch.'
        }
    }
}

export default Validations;
export { Validations };
