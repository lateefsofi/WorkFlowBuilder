import axios from 'axios';
import config from '../../config';
import responseTypes from '../constants/settings.constants';
import { getFromLocalStorage } from './storage.service';

import links from '../constants/links.constants';

const getAuthToken = () => {
    let token= '';
    const loginData= getFromLocalStorage('loginData');
    if(loginData && loginData.accessToken)
        token= 'Bearer ' + loginData.accessToken;
    else{
        window.location.pathname= links.LOGIN;
    }
    return token;
}

export const apiCall = (method, uri, requestData, options ={}) => {
    let requestObject = {
        method: method,
        baseURL: config.url,
        url:  uri,
        data: requestData,
        'Content-Type': responseTypes.JSON,
        responseType: options.responseType || responseTypes.JSON,
    }
    if(options.authenticate) {
        requestObject.headers= {
            Authorization: getAuthToken()
        }
    }
    return new Promise((resolve, reject)=>{
        axios(requestObject)
            .then((response)=>{
                resolve(response);
            })
            .catch((err)=>{
                reject(err);
            });
    });
}

export default apiCall;
