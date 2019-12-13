import mailService from '../services/mail'
import { setNotification } from './notification'

export const fetchInbox = () => {

  return async (dispatch, getState) => {

    const { token } = getState().user

    mailService.saveToken(token)
    const response = await mailService.fetchInbox()

    dispatch({
      type: 'FETCH_INBOX',
      inbox: response
    })
  }
}

export const fetchSent = () => {

  return async (dispatch, getState) => {

    const { token } = getState().user

    mailService.saveToken(token)
    const response = await mailService.fetchSent()

    dispatch({
      type: 'FETCH_SENT',
      sent: response
    })
  }
}

export const reply = (messageId, content) => {

  return async (dispatch, getState) => {

    const { token } = getState().user
    mailService.saveToken(token)

    try {
      const response = await mailService.reply({ messageId, content })

      dispatch({
        type: 'REPLY',
        mail: response
      })

    } catch (error) {
      dispatch(setNotification('Unable to send mail'))
    }
  }
}

export const sendMail = (username, title, content) => {

  return async (dispatch, getState) => {

    const { token } = getState().user
    mailService.saveToken(token)
    const response = await mailService.sendMail({ username, title, content })

    dispatch({
      type: 'SEND_MAIL',
      mail: response
    })
  }
}

export const deleteMail = (id, source) => {

  return async (dispatch, getState) => {
    const { token } = getState().user
    mailService.saveToken(token)

    try {
      await mailService.deleteMail(id, source)

      dispatch({
        type: 'DELETE_MAIL',
        source,
        id
      })

    } catch (error) {
      console.log(error)
    }

  }
}

export const setUnreadMailCount = () => {

  return async (dispatch, getState) => {
    const { token } = getState().user
    mailService.saveToken(token)

    const result = await mailService.setUnreadMailCount()

    dispatch({
      type: 'SET_UNREAD_MAIL_COUNT',
      count: result.count
    })

  }
}

export const mailRead = id => {

  return async (dispatch, getState) => {

    dispatch({ type: 'MAIL_READ' })

    const { token } = getState().user
    mailService.saveToken(token)

    mailService.setMailRead(id)
  }
}

export const mailUnread = () => ({
  type: 'MAIL_UNREAD'
})