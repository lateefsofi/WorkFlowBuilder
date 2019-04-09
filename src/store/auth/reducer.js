const initialState = {
    isLoggedIn: false,
    loginData: null
}
const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_LOGGED_IN':
        return {
          ...state,
          isLoggedIn: true,
          loginData: action.payload
        }
      case 'USER_LOGGED_OUT':
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
