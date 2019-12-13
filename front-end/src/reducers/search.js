
const initialState = {
  age: [],
  gender: '',
  page: 1,
  limit: 12,
  profileCount: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return {
        ...state,
        ...action.data
      }

    case 'RESET':
      return initialState

    default:
      return state
  }
}