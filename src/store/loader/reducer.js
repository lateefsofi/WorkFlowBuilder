const initialState = {
    isLoading: false,
    message: ''
}
const LoaderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_LOADER':
        return {
          ...state,
          isLoading: true,
          message: action.message
        }
      case 'HIDE_LOADER':
        return {
            ...state,
            isLoading: false,
            message: ''
          }
      default:
        return state
    }
  }

  export default LoaderReducer;