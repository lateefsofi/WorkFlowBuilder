import actionTypes from './action-types';

const initialState = {
  botList: []
}
export const BotListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BOT_LIST_SUCCESS:
      return {
        ...state,
        botList: action.payload
      }
    default:
      return state
  }
}

export default BotListReducer;