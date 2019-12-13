import searchReducer from '../../reducers/search'
import deepFreeze from 'deep-freeze'

describe('search reducer', () => {

  test('returns new state with SET_SEARCH', () => {
    const state = {
      age: [],
      gender: '',
      page: 1,
      limit: 12,
      profileCount: 0
    }

    const action = {
      type: 'SET_SEARCH',
      data: {
        age: [20, 30],
        gender: 'female',
        page: 2,
        limit: 12,
        profileCount: 38
      }
    }

    deepFreeze(state)
    const newState = searchReducer(state, action) 

    expect(newState).toEqual(action.data)

  })

  test('should reset state to initial state', () => {
    const state = {
      age: [20, 30],
      gender: 'female',
      page: 2,
      limit: 12,
      profileCount: 38
    }

    const action = {
      type: 'RESET'
    }

    const newState = searchReducer(state, action)

    expect(newState).toEqual({
      age: [],
      gender: '',
      page: 1,
      limit: 12,
      profileCount: 0
    })

  })

})