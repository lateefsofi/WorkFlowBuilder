import * as actionTypes from './action-types';

const initialState = {
    isLoggedIn: false,
    loginData: null
}
const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.USER_LOGGED_IN:
        return {
          ...state,
          isLoggedIn: true,
          loginData: action.payload
        }
      case actionTypes.USER_LOGGED_IN_ERR:
        return {
          ...state,
          loginError: action.payload
        }
      case actionTypes.USER_LOGGED_OUT:
        return {
          ...state,
          isLoggedIn: false,
          loginData: null
        }
      default:
        return state
    }
  }

  export default AuthReducer;
