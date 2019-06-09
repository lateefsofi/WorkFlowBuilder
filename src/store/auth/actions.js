import * as actionTypes from './action-types';
import apiCall from '../../shared/services/web-api.service';
import endPoints from '../../shared/constants/endPoints.constants';
import { addToLocalStorage } from '../../shared/services/storage.service'

export const login = (requestData) => {
  return function(dispatch) {
    dispatch({
      type: actionTypes.LOGIN_REQUEST
    });
    return apiCall(
      'POST',
      endPoints.LOGIN,
      requestData,
      {
        authenticate: true
      })
      .then(response=>{
        dispatch({
          type: actionTypes.USER_LOGGED_IN,
          payload: response.data
        })
        addToLocalStorage('loginData', response.data);
        return response;
      })
      .catch(err => {
        dispatch({
          type: actionTypes.USER_LOGGED_IN_ERR,
          payload: err
        })
        return err;
      });
  }
}