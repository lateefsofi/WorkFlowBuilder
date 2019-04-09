
export const showLoader = message => ({
  type: 'SHOW_LOADER',
  message
})

export const hideLoader = () => ({
  type: 'HIDE_LOADER'
})

export const LoaderActions = {
  SHOW_LOADER: 'SHOW_LOADER',
  HIDE_LOADER: 'HIDE_LOADER'
}
