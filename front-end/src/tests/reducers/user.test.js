import userReducer from '../../reducers/user'
import deepFreeze from 'deep-freeze'

describe('user reducer', () => {

  const initialState = {
    loggedIn: false
  }

  test('SIGNUP', () => {
    const state = initialState

    const action = {
      type: 'SIGNUP',
      userData: {
        id: 1,
        username: 'timo'
      }
    }

    deepFreeze(state)
    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      loggedIn: false
    })

  })

  test('LOGIN', () => {
    const state = initialState

    const action = {
      type: 'LOGIN',
      userData: {
        id: 1,
        username: 'timo'
      }
    }

    deepFreeze(state)
    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      loggedIn: true
    })
  })

  test('EDIT_PROFILE_TEXT', () => {
    const state = {
      id: 1,
      username: 'timo',
      profile: {
        profileText: 'moi vaan!'
      },
      loggedIn: false
    }

    const action = {
      type: 'EDIT_PROFILE_TEXT',
      profile: {
        profileText: 'hyvää joulua!'
      }
    }

    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      profile: {
        profileText: 'hyvää joulua!'
      },
      loggedIn: false
    })
  })

  test('ADD_PROFILE_PICTURE', () => {
    const state = {
      id: 1,
      username: 'timo',
      profile: {
        profileText: 'moi vaan!'
      },
      loggedIn: false
    }

    const action = {
      type: 'ADD_PROFILE_PICTURE',
      image: 'possu.jpg'
    }

    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      profile: {
        profileText: 'moi vaan!',
        image: 'possu.jpg'
      },
      loggedIn: false
    })
  })

  test('ADD_TO_FAVORITES', () => {
    const state = {
      id: 1,
      favorites: [],
      username: 'timo',
      profile: {
        profileText: 'moi vaan!'
      },
      loggedIn: false
    }

    const profile = {
      id: 2,
      username: 'hanna',
      loggedIn: false
    }

    const action = {
      type: 'ADD_TO_FAVORITES',
      profile
    }

    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      profile: {
        profileText: 'moi vaan!'
      },
      favorites: [profile],
      loggedIn: false
    })
  })

  test('BLOCK_USER', () => {
    const state = {
      id: 1,
      username: 'timo',
      loggedIn: false,
      blocked: []
    }

    const profile = {
      id: 2,
      username: 'hanna',
      loggedIn: false
    }

    const action = {
      type: 'BLOCK_USER',
      userToBlock: profile.username
    }

    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      loggedIn: false,
      blocked: ['hanna']
    })
  })

  test('UNBLOCK_USER', () => {
    const state = {
      id: 1,
      username: 'timo',
      loggedIn: false,
      blocked: ['hanna']
    }

    const profile = {
      id: 2,
      username: 'hanna',
      loggedIn: false
    }

    const action = {
      type: 'UNBLOCK_USER',
      userToBlock: profile.username
    }

    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      loggedIn: false,
      blocked: []
    })
  })

  test('BEING_BLOCKED', () => {
    const state = {
      id: 1,
      username: 'timo',
      loggedIn: false,
      blockedBy: []
    }

    const profile = {
      id: 2,
      username: 'hanna',
      loggedIn: false
    }

    const action = {
      type: 'BEING_BLOCKED',
      userWhoBlocked: profile.username
    }

    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      loggedIn: false,
      blockedBy: [profile.username]
    })
  })

  test('BEING_UNBLOCKED', () => {
    const state = {
      id: 1,
      username: 'timo',
      loggedIn: false,
      blockedBy: ['hanna']
    }

    const profile = {
      id: 2,
      username: 'hanna',
      loggedIn: false
    }

    const action = {
      type: 'BEING_UNBLOCKED',
      userWhoBlocked: profile.username
    }

    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      loggedIn: false,
      blockedBy: []
    })
  })

  test('REMOVE_FROM_FAVORITES', () => {
    const state = {
      id: 1,
      username: 'timo',
      loggedIn: false,
      favorites: [{
        id: 2,
        username: 'hanna',
        loggedIn: false
      }]
    }

    const profile = {
      id: 2,
      username: 'hanna',
      loggedIn: false
    }

    const action = {
      type: 'REMOVE_FROM_FAVORITES',
      profile
    }

    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      loggedIn: false,
      favorites: []
    })
  })

  test('TOGGLE_CHAT_ENABLED', () => {
    const state = {
      id: 1,
      username: 'timo',
      loggedIn: false,
      blockedBy: ['hanna'],
      profile: {
        id: 1,
        chatEnabled: false
      }
    }

    const action = {
      type: 'TOGGLE_CHAT_ENABLED',
      enable: true
    }

    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      loggedIn: false,
      blockedBy: ['hanna'],
      profile: {
        id: 1,
        chatEnabled: true
      }
    })
  })

  test('TOGGLE_PROFILE_VISIBLE', () => {
    const state = {
      id: 1,
      username: 'timo',
      loggedIn: false,
      blockedBy: ['hanna'],
      profile: {
        id: 1,
        visible: false
      }
    }
    
    const action = {
      type: 'TOGGLE_PROFILE_VISIBLE',
      visible: true
    }

    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      loggedIn: false,
      blockedBy: ['hanna'],
      profile: {
        id: 1,
        visible: true
      }
    })
  })


  test('TOGGLE_ONLINE', () => {
    const state = {
      id: 1,
      username: 'timo',
      loggedIn: false,
      blockedBy: ['hanna'],
      profile: {
        id: 1,
        online: false
      }
    }
    
    const action = {
      type: 'TOGGLE_ONLINE',
      online: true
    }

    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      loggedIn: false,
      blockedBy: ['hanna'],
      profile: {
        id: 1,
        online: true
      }
    })
  })

  test('FETCH_FAVORITES', () => {
    const state = {
      id: 1,
      username: 'timo',
      loggedIn: false,
      blockedBy: ['hanna'],
      profile: {
        id: 1,
        online: false
      },
      favorites: []
    }
    
    const action = {
      type: 'FETCH_FAVORITES',
      profiles: [{
        id: 2,
        username: 'hanna',
        loggedIn: false
      },
      {
        id: 2,
        username: 'riina',
        loggedIn: false
      }]
    }

    const newState = userReducer(state, action)

    expect(newState).toEqual({
      id: 1,
      username: 'timo',
      loggedIn: false,
      blockedBy: ['hanna'],
      profile: {
        id: 1,
        online: false
      },
      favorites: action.profiles
    })
  })

})