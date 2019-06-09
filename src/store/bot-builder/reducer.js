import actionTypes from './action-types';

const initialState = {
  selectedElement: null,
  builderData: {
    name: 'Untitled Bot',
    data: {},
    id: null
  },
  botSaveErrors: []
}
const BotBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_BOT_DATA:
      return {
        ...state,
        builderData: {
          ...state.builderData,
          ...action.payload
        }
      }
    case actionTypes.EDIT_BOT_ELEMENT:
      return {
        ...state,
        selectedElement: action.payload
      }
    case actionTypes.SAVE_BOT_ELEMENTS_REQUEST:
      return {
        ...state,
        botSaveErrors: []
      }
    case actionTypes.SAVE_BOT_ELEMENTS:
      return {
        ...state,
        builderData: { ...state.builderData, id: action.payload.id }
      }
    case actionTypes.SAVE_BOT_ELEMENTS_ERROR:
      return {
        ...state,
        botSaveErrors: action.payload
      }
    default:
      return state
  }
}

export default BotBuilderReducer;