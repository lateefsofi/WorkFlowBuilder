import axios from 'axios';
import config from '../../config';
import responseTypes from '../constants/settings.constants';
import { getFromLocalStorage } from './Storage.service';

import links from '../constants/links.constants';

const getAuthToken = () => {
    let token= '';
    const loginData= getFromLocalStorage('loginData');
    if(loginData && loginData.access_token)
        token= 'Bearer ' + loginData.access_token;
    else{
        // this.props.history.push(links.LOGIN);
        window.location.pathname= links.LOGIN;
    }
    return token;
}

const apiCall = (method, uri, requestData, options ={}) => {
    let requestObject = {
        method: method,
        baseURL: config.url,
        url:  uri,
        data: requestData,
        'Content-Type': responseTypes.JSON,
        responseType: options.responseType || responseTypes.JSON,
    }
    if(options.authenticate) {
        requestObject.header= getAuthToken();
    }
    return new Promise((resolve, reject)=>{
        axios(requestObject)
            .then((response)=>{
                debugger
                resolve(response);
            })
            .catch((err)=>{
                debugger
                reject(err);
            });
    });
}

export default apiCall
export {
    apiCall
}
