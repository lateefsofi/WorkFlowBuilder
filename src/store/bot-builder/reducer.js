import actionTypes from './action-types';

const initialState = {
  selectedElement: null
}
const BotBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EDIT_BOT_ELEMENT:
    console.log("INSIDE REDUCR: ", action);
      return {
        ...state,
        selectedElement: action.payload
      }
    default:
      return state
  }
}

export default BotBuilderReducer;