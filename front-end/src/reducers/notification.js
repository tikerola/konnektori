const initialState = ''

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message

    case 'RESET':
      return initialState

    default:
      return state
  }
}