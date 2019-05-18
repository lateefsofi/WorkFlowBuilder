/**
 * Title: User registration Validation rules.
 * Description: Registration form will be validated with these validations before submitting.
 * Author:    Lateef Sofi.
 * Created:   31/10/2018.
 * Last Modified: 11/11/2018.
 **/

import { patterns } from '../../shared/constants';

export const Validations = {
    message: {
        required: {
            value: true,
            message: 'Please enter message.'
        },
        minLength: {
            value: 2,
            message: 'Message should be more than 3 characters.'
        },
        maxLength: {
            value: 500,
            message: 'Message should not exceede 500 characters.'
        }
    }
}

export default Validations;
