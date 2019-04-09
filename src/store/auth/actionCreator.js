export const userLoggedIn = payload => ({
  type: 'USER_LOGGED_IN',
  payload
})

export const userLoggedOut = () => ({
  type: 'USER_LOGGED_OUT'
})

export const AuthActions = {
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT'
}
