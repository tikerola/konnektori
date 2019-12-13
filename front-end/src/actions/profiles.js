import profilesService from '../services/profiles'
import { setSearch } from './search'
import { setNotification } from './notification'

export const searchProfiles = (searchOptions) => {

  return async (dispatch, getState) => {

    const { token } = getState().user

    profilesService.saveToken(token)
    const response = await profilesService.searchProfiles(searchOptions)

    if (response.count >= 0)
      dispatch(setSearch({ ...searchOptions, profileCount: response.count }))
    else
      dispatch(setSearch(searchOptions))

    dispatch({
      type: 'SEARCH_PROFILES',
      profiles: response.profiles
    })
  }
}

export const searchProfile = (username, history) => {

  return async (dispatch, getState) => {
    const { token } = getState().user

    profilesService.saveToken(token)

    try {

      const response = await profilesService.searchProfile(username)

      await dispatch({
        type: 'SEARCH_PROFILES',
        profiles: [response]
      })

      history.push(`/search/profiles/${username}`)
    }
    catch (error) {
      dispatch(setNotification('No such username'))

    }
  }
}


export const fetchFavorites = () => {
  return async (dispatch, getState) => {
    const { token } = getState().user

    profilesService.saveToken(token)

    const response = await profilesService.fetchFavorites()

    dispatch({
      type: 'FETCH_FAVORITES',
      profiles: response
    })
  }
}