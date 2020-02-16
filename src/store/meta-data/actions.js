
import * as actionTypes from './action-types';
import apiCall from '../../shared/services/web-api.service';
import endPoints from '../../shared/constants/endPoints.constants';

export const getCountries = () => {
  return function(dispatch) {
    dispatch({
      type: actionTypes.COUNTRIES_DATA_REQUEST
    });
    return apiCall(
      'GET',
      endPoints.COUNTRIES,
      null,
      {
        authenticate: false
      })
      .then(response=>{
        dispatch({
          type: actionTypes.COUNTRIES_DATA_RESPONSE,
          payload: response.data
        })
        return response;
      })
      .catch(err => {
        dispatch({
          type: actionTypes.COUNTRIES_DATA_ERR,
          payload: err
        })
        return err;
      });
  }
}
  
