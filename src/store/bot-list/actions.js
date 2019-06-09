import actionTypes from './action-types';
import { apiCall } from '../../shared/services/web-api.service';
import { endPoints } from '../../shared/constants'

export const getBotList = botId => {
  return function(dispatch){
    return apiCall('GET', endPoints.BOT_BUILDER, null, { authenticate: true })
      .then( response => {
        console.log("GET BOTS LIST RESPONSE: ", response);
        if(response && response.data) {
          dispatch({
            type: actionTypes.GET_BOT_LIST_SUCCESS,
            payload: response.data
          })
        }
      })
      .catch( err => {

      })
  }
}

export const deleteBot = botId => {
  return function(dispatch, getState) {
    const uri= `${endPoints.BOT_BUILDER}/${botId}`;
    return apiCall('DELETE', uri, null, { authenticate: true} )
      .then(() => {
        dispatch({
          type: actionTypes.GET_BOT_LIST_SUCCESS,
          payload: getState().BotListReducer.botList.filter(item => item.id !== botId)
        })
      })
  }
}