import chatReducer from '../../reducers/chat'
import deepFreeze from 'deep-freeze'

describe('chat reducer', () => {

  const initialState = {
    sessions: {},
    chatWith: '',
    chatOpen: false,
    maxWindow: false
  }

  test('OPEN_CHAT', () => {
    const state = initialState

    const action = {
      type: 'OPEN_CHAT'
    }

    deepFreeze(state)
    const newState = chatReducer(state, action) 

    expect(newState).toEqual({
      ...initialState,
      chatOpen: true
    })

  })

  test('CLOSE_CHAT', () => {
    const state = {
      sessions: {},
      chatWith: '',
      chatOpen: true,
      maxWindow: false
    }

    const action = {
      type: 'CLOSE_CHAT'
    }

    deepFreeze(state)
    const newState = chatReducer(state, action) 

    expect(newState).toEqual({
      ...initialState,
      chatOpen: false
    })

  })

  test('TOGGLE_CHAT', () => {
    const state = {
      sessions: {},
      chatWith: '',
      chatOpen: true,
      maxWindow: false
    }

    const action = {
      type: 'TOGGLE_CHAT'
    }

    deepFreeze(state)
    const newState = chatReducer(state, action) 

    expect(newState).toEqual({
      ...initialState,
      chatOpen: false
    })

  })

  test('ADD_CHAT_MESSAGE', () => {
    const state = {
      sessions: {
        hanna: {
          messages: []
        }
      },
      chatWith: '',
      chatOpen: true,
      maxWindow: false
    }

    const action = {
      type: 'ADD_CHAT_MESSAGE',
      id: 'hanna',
      message: 'moikka könsikäs!'
    }

    deepFreeze(state)
    const newState = chatReducer(state, action) 

    expect(newState).toEqual({
      sessions: {
        hanna: {
          messages: ['moikka könsikäs!']
        }
      },
      chatWith: '',
      chatOpen: true,
      maxWindow: false
    })

  })

  test('RECEIVE_CHAT_MESSAGE', () => {
    const state = {
      sessions: {
        hanna: {
          messages: []
        }
      },
      chatWith: '',
      chatOpen: false,
      maxWindow: false
    }

    const action = {
      type: 'RECEIVE_CHAT_MESSAGE',
      id: 'hanna',
      message: 'moikka könsikäs!'
    }

    deepFreeze(state)
    const newState = chatReducer(state, action) 

    expect(newState).toEqual({
      sessions: {
        hanna: {
          messages: ['moikka könsikäs!']
        }
      },
      chatWith: '',
      chatOpen: true,
      maxWindow: false
    })

  })

  test('CREATE_CHAT_SESSION', () => {
    const state = {
      sessions: {
        tuula: {
          messages: ['moi kulta']
        }
      },
      chatWith: 'tuula',
      chatOpen: false,
      maxWindow: false
    }

    const action = {
      type: 'CREATE_CHAT_SESSION',
      id: 'hanna',
      session: {
        messages: []
      },
      setChatWith: 'hanna'
    }

    deepFreeze(state)
    const newState = chatReducer(state, action) 

    expect(newState).toEqual({
      sessions: {
        tuula: {
          messages: ['moi kulta']
        },
        hanna: {
          messages: []
        }
      },
      chatWith: 'hanna',
      chatOpen: true,
      maxWindow: false
    })

  })


  test('DESTROY_SESSION', () => {
    const state = {
      sessions: {
        tuula: {
          messages: ['moi kulta']
        },
        hanna: {
          messages: []
        }
      },
      chatWith: 'hanna',
      chatOpen: true,
      maxWindow: false
    }

    const action = {
      type: 'DESTROY_SESSION',
      sessionId: 'hanna'
    }

    deepFreeze(state)
    const newState = chatReducer(state, action) 

    expect(newState).toEqual({
      sessions: {
        tuula: {
          messages: ['moi kulta']
        }
      },
      chatWith: 'tuula',
      chatOpen: true,
      maxWindow: false
    })

  })

  test('SET_CHAT_WITH', () => {
    const state = {
      chatWith: 'hanna',
      chatOpen: true,
      maxWindow: false
    }

    const action = {
      type: 'SET_CHAT_WITH',
      chatWith: 'tuula'
    }

    deepFreeze(state)
    const newState = chatReducer(state, action) 

    expect(newState).toEqual({
      chatWith: 'tuula',
      chatOpen: true,
      maxWindow: true
    })

  })

  test('SET_MAX_WINDOW', () => {
    const state = {
      chatWith: 'hanna',
      chatOpen: true,
      maxWindow: false
    }

    const action = {
      type: 'SET_MAX_WINDOW',
      onOff: true
    }

    deepFreeze(state)
    const newState = chatReducer(state, action) 

    expect(newState).toEqual({
      chatWith: 'hanna',
      chatOpen: true,
      maxWindow: true
    })

  })

  test('SET_DOT', () => {
    const state = {
      sessions: {
        hanna: {
          dot: false,
          messages: []
        }
      },
      chatWith: 'hanna',
      chatOpen: true,
      maxWindow: false
    }

    const action = {
      type: 'SET_DOT',
      onOff: true,
      id: 'hanna'
    }

    deepFreeze(state)
    const newState = chatReducer(state, action) 

    expect(newState).toEqual({
      sessions: {
        hanna: {
          dot: true,
          messages: []
        }
      },
      chatWith: 'hanna',
      chatOpen: true,
      maxWindow: false
    })

  })

  test('RESET', () => {
    const state = {
      sessions: {
        hanna: {
          dot: false,
          messages: []
        }
      },
      chatWith: 'hanna',
      chatOpen: true,
      maxWindow: false
    }

    const action = {
      type: 'RESET'
    }

    deepFreeze(state)
    const newState = chatReducer(state, action) 

    expect(newState).toEqual({
      ...initialState
    })

  })

})