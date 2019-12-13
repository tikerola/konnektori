import profilesReducer from '../../reducers/profiles'
import deepFreeze from 'deep-freeze'

describe('profiles reducer', () => {

  test('SEARCH_PROFILES', () => {
    const state = []

    const action = {
      type: 'SEARCH_PROFILES',
      profiles: [{
        id: 1,
        username: 'timo',
        loggedIn: true
      },
      {
        id: 2,
        username: 'hanna',
        loggedIn: false
      }]
    }

    deepFreeze(state)
    const newState = profilesReducer(state, action) 

    expect(newState).toEqual(action.profiles)

  })

  test('RESET', () => {
    const state = {
      type: 'SEARCH_PROFILES',
      profiles: [{
        id: 1,
        username: 'timo',
        loggedIn: true
      },
      {
        id: 2,
        username: 'hanna',
        loggedIn: false
      }]
    }

    const action = {
      type: 'RESET'
    }

    const newState = profilesReducer(state, action)

    expect(newState).toEqual([])

  })

})