
import { setNotification } from './notification'
import { socket } from '../index'


export const openChat = () => ({
  type: 'OPEN_CHAT'
})

export const closeChat = () => ({
  type: 'CLOSE_CHAT'
})

export const toggleChat = () => ({
  type: 'TOGGLE_CHAT'
})

export const sendChatMessage = (from, to, message) => {

  return async (dispatch, getState) => {
    socket.emit('chat', { from, to, message })

    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      id: to,
      message: `Sinä: ${message}`
    })
  }
}

export const createChatSession = (to, setChatWith) => {
  const session = {
    messages: [],
    dot: 0
  }

  return {
    type: 'CREATE_CHAT_SESSION',
    id: to,
    session,
    setChatWith
  }
}

export const destroySession = sessionId => ({
  type: 'DESTROY_SESSION',
  sessionId
})

export const receiveChatMessage = (from, message) => {
  return async (dispatch, getState) => {

    const sessions = getState().chat.sessions
    const chatWith = getState().chat.chatWith
    const maxWindow = getState().chat.maxWindow

    if (!sessions[from]) {
      await dispatch(createChatSession(from, false))
    }

    if (chatWith !== from) {
      dispatch(setNotification(`${from}: ${message.substring(0, 20)}...`))
      dispatch(setDot(from, 1))
    }
    else if (!maxWindow) {
      dispatch(setNotification(`${from}: ${message.substring(0, 20)}...`))
      dispatch(setDot(from, 1))
    }

    let chatMessage 

    if (message.substring(0, 9) === 'Chat Bot:')
      chatMessage = message

    else 
      chatMessage = `${from}: ${message}`

    dispatch({
      type: 'RECEIVE_CHAT_MESSAGE',
      id: from,
      message: chatMessage
    })

  }
}

export const setChatWith = chatWith => ({
  type: 'SET_CHAT_WITH',
  chatWith
})

export const setDot = (id, onOff) => ({
  type: 'SET_DOT',
  id,
  onOff
})

export const setMaxWindow = onOff => ({
  type: 'SET_MAX_WINDOW',
  onOff
})