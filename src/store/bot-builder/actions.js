import actionTypes from './action-types';
import apiCall from '../../shared/services/web-api.service';
import endPoints from '../../shared/constants/endPoints.constants';
import { isEmpty } from '../../shared/utils/utils';

export const setEditData = data => ({
  type: actionTypes.EDIT_BOT_ELEMENT,
  payload: data
});

export const updateBotData = data => ({
  type: actionTypes.UPDATE_BOT_DATA,
  payload: data
})

/**
 * Save bot elements configuration
 * @param {*} data 
 */
export const saveBotElements = data => {
  return function(dispatch, getState) {
    const data = getState().BotBuilderReducer.builderData;
    if(isEmpty(data.data)) {
      return;
    }
    dispatch({
      type: actionTypes.SAVE_BOT_ELEMENTS_REQUEST
    })
    apiCall(
      'PUT',
      endPoints.BOT_BUILDER,
      data,
      {
        authenticate: true
      })
      .then(response=>{
        dispatch({
          type: actionTypes.SAVE_BOT_ELEMENTS,
          payload: response && response.data? response.data : {}
        })
      })
      .catch(err => {
        dispatch({
          type: actionTypes.SAVE_BOT_ELEMENTS_ERROR,
          payload: err
        })
      })
  } 
} 


// export const BotBuilderActions = {
//   EDIT_BOT_ELEMENT: actionTypes.EDIT_BOT_ELEMENT
// }