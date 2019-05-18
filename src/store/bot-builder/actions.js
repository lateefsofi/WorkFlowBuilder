import actionTypes from './action-types';

export const setEditData = data => ({
  type: actionTypes.EDIT_BOT_ELEMENT,
  payload: data
})

// export const setEditData = data => (
//   dispatch,
//   getState
// ) => ({
//   type: actionTypes.EDIT_BOT_ELEMENT,
//   payload: data
// })

export const BotBuilderActions = {
  EDIT_BOT_ELEMENT: actionTypes.EDIT_BOT_ELEMENT
}