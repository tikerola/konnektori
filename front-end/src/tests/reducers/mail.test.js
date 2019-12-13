import mailReducer from '../../reducers/mail'
import deepFreeze from 'deep-freeze'

describe('mail reducer', () => {

  const initialState = {
    inbox: [],
    sent: [],
    countOfUnread: 0
  }

  test('FETCH_INBOX', () => {

    const state = initialState

    const action = {
      type: 'FETCH_INBOX',
      inbox: [
        {
          title: "hei, me lennetään",
          content: "no eino wiseguy",
          username: 'timo'
        },
        {
          title: "hei, me lennetään",
          content: "no eino wiseguy",
          username: 'hanna'
        }
      ]
    }

    deepFreeze(state)
    const newState = mailReducer(state, action)

    expect(newState).toEqual({
      inbox: action.inbox,
      sent: [],
      countOfUnread: 0
    })

  })

  test('FETCH_SENT', () => {

    const action = {
      type: 'FETCH_SENT',
      sent: [
        {
          title: "hei, me lennetään",
          content: "no eino wiseguy",
          username: 'timo'
        },
        {
          title: "hei, me lennetään",
          content: "no eino wiseguy",
          username: 'hanna'
        }
      ]
    }

    const newState = mailReducer(initialState, action)

    expect(newState).toEqual({
      inbox: [],
      sent: action.sent,
      countOfUnread: 0
    })

  })

  test('SEND_MAIL', () => {

    const action = {
      type: 'SEND_MAIL',
      mail:
      {
        title: "hei, me lennetään",
        content: "no eino wiseguy",
        username: 'timo'
      }
    }

    const newState = mailReducer(initialState, action)

    expect(newState).toEqual({
      inbox: [],
      sent: [action.mail],
      countOfUnread: 0
    })
  })

  test('DELETE_MAIL', () => {

    const inbox = [
      {
        title: "hei, me lennetään",
        content: "no eino wiseguy",
        username: 'timo',
        id: 1
      },
      {
        title: "vai lennetäänkö?",
        content: "no eino wiseguy",
        username: 'hanna',
        id: 2
      }]

    const state = {
      inbox,
      sent: [],
      countOfUnread: 0
    }

    const action = {
      type: 'DELETE_MAIL',
      id: 1,
      source: 'inbox'
    }

    const newState = mailReducer(state, action)

    expect(newState).toEqual({
      inbox: [{
        title: "vai lennetäänkö?",
        content: "no eino wiseguy",
        username: 'hanna',
        id: 2
      }],
      sent: [],
      countOfUnread: 0
    })
  })

  test('SET_UNREAD_MAIL_COUNT', () => {

    const action = {
      type: 'SET_UNREAD_MAIL_COUNT',
      count: 5
    }

    const newState = mailReducer(initialState, action)

    expect(newState).toEqual({
      inbox: [],
      sent: [],
      countOfUnread: 5
    })
  })

  test('MAIL_READ', () => {

    const state = {
      inbox: [],
      sent: [],
      countOfUnread: 4
    }

    const action = {
      type: 'MAIL_READ'
    }

    const newState = mailReducer(state, action)

    expect(newState).toEqual({
      inbox: [],
      sent: [],
      countOfUnread: 3
    })
  })

  test('MAIL_UNREAD', () => {

    const state = {
      inbox: [],
      sent: [],
      countOfUnread: 4
    }

    const action = {
      type: 'MAIL_UNREAD'
    }

    const newState = mailReducer(state, action)

    expect(newState).toEqual({
      inbox: [],
      sent: [],
      countOfUnread: 5
    })
  })


})