
const initialState = {
  inbox: [],
  sent: [],
  countOfUnread: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_INBOX':
      return {
        ...state,
        inbox: action.inbox
      }

    case 'FETCH_SENT':
      return {
        ...state,
        sent: action.sent
      }

    case 'REPLY':
    case 'SEND_MAIL':
      return {
        ...state,
        sent: state.sent.concat(action.mail)
      }

    case 'RESET':
      return initialState

    case 'DELETE_MAIL':
      return {
        ...state,
        [action.source]: state[action.source].filter(mail => mail.id !== action.id)
      }

    case 'SET_UNREAD_MAIL_COUNT':
      return {
        ...state,
        countOfUnread: action.count
      }
    case 'MAIL_READ':
      return {
        ...state,
        countOfUnread: state.countOfUnread - 1
      }

    case 'MAIL_UNREAD':
      return {
        ...state,
        countOfUnread: state.countOfUnread + 1
      }

    default:
      return state
  }
}