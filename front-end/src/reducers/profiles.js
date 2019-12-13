
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_FAVORITES':
    case 'SEARCH_PROFILES':
      return action.profiles

    case 'RESET':
      return initialState


    default:
      return state
  }
}