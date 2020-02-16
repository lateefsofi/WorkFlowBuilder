import * as actionTypes from './action-types';

const initialState = {
    countries: [],
}
const MetaDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.COUNTRIES_DATA_REQUEST:
      case actionTypes.COUNTRIES_DATA_ERR:
        return {
          ...state,
          countries: []
        }
      case actionTypes.COUNTRIES_DATA_RESPONSE:
        return {
          ...state,
          countries: action.payload
        }
      default:
        return state
    }
  }

  export default MetaDataReducer;
