import notificationReducer from '../../reducers/notification'
import deepFreeze from 'deep-freeze'

describe('notification reducer', () => {

  test('SEARCH_PROFILES', () => {
    const state = ''

    const action = {
      type: 'SET_NOTIFICATION',
      message: 'moi moi'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual(action.message)

  })

  test('RESET', () => {
    const state = 'jep jep'

    const action = {
      type: 'RESET'
    }

    const newState = notificationReducer(state, action)

    expect(newState).toEqual('')

  })

})