
import userService from '../services/user'
import { setUnreadMailCount } from './mail'
import { setNotification } from './notification'
import { socket } from '../index'


export const signup = userData => {

  return async dispatch => {

    try {
      const response = await userService.signup(userData)

      dispatch({
        type: 'SIGNUP',
        userData: response
      })

    } catch (error) {
      throw error
    }
  }
}

export const login = credentials => {
  return async dispatch => {

    try {
      const response = await userService.login(credentials)

      await dispatch({
        type: 'LOGIN',
        userData: response
      })

      dispatch(setUnreadMailCount())

    } catch (error) {
      dispatch(setNotification('Wrong username or password'))
    }
  }
}

export const logout = (asyncOk = true) => {
  return async (dispatch, getState) => {
    const { token } = getState().user
    userService.saveToken(token)

    if (asyncOk)
      await userService.toggleOnline(false)


    await dispatch({
      type: 'RESET'
    })

    sessionStorage.clear()

    socket.disconnect()
  }
}

export const editProfileText = profileText => {

  return async (dispatch, getState) => {
    const { token } = getState().user
    userService.saveToken(token)

    const response = await userService.edit({ profileText })


    dispatch({
      type: 'EDIT_PROFILE_TEXT',
      profile: response
    })
  }
}

export const addProfileImage = file => {

  return async (dispatch, getState) => {
    const { token } = getState().user
    userService.saveToken(token)

    const response = await userService.addProfileImage(file)

    dispatch({
      type: 'ADD_PROFILE_PICTURE',
      image: response
    })

  }
}

export const addToFavorites = (username, operation) => {

  return async (dispatch, getState) => {
    const { token } = getState().user
    userService.saveToken(token)

    const response = await userService.addToFavorites(username, operation)

    const type = response.operation === 'add' ? 'ADD_TO_FAVORITES' : 'REMOVE_FROM_FAVORITES'

    dispatch({
      type,
      profile: response.profile
    })
  }
}

export const blockUser = (userToBlock, block) => {

  return async (dispatch, getState) => {
    const { token } = getState().user
    userService.saveToken(token)

    const response = await userService.blockUser(userToBlock, block)
    const type = block ? 'BLOCK_USER' : 'UNBLOCK_USER'

    dispatch({
      type,
      userToBlock: response
    })

  }
}

export const beingBlocked = (userWhoBlocked, block) => {

  const type = block ? 'BEING_BLOCKED' : 'BEING_UNBLOCKED'

  return {
    type,
    userWhoBlocked
  }
}

export const toggleChatEnabled = enable => {

  return async (dispatch, getState) => {
    const { token } = getState().user
    userService.saveToken(token)

    const response = await userService.toggleChatEnabled(enable)

    dispatch({
      type: 'TOGGLE_CHAT_ENABLED',
      enable: response
    })

  }
}

export const toggleProfileVisible = visible => {

  return async (dispatch, getState) => {
    const { token } = getState().user
    userService.saveToken(token)

    const response = await userService.toggleProfileVisible(visible)

    dispatch({
      type: 'TOGGLE_PROFILE_VISIBLE',
      visible: response
    })

  }
}

export const toggleOnline = online => {
  return async (dispatch, getState) => {
    const { token } = getState().user

    userService.saveToken(token)

    const response = await userService.toggleOnline(online)

    dispatch({
      type: 'TOGGLE_ONLINE',
      online: response
    })
  }
}