
const initialState = {
  loggedIn: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return {
        ...state,
        ...action.userData
      }
    case 'LOGIN':
      return {
        loggedIn: true,
        ...action.userData
      }

    case 'LOGOUT':
    case 'RESET':
      return initialState

    case 'EDIT_PROFILE_TEXT':
      return {
        ...state,
        profile: action.profile
      }

    case 'ADD_PROFILE_PICTURE':
      return {
        ...state,
        profile: {
          ...state.profile,
          image: action.image
        }
      }

    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.concat(action.profile)
      }

    case 'BLOCK_USER':
      return {
        ...state,
        blocked: state.blocked.concat(action.userToBlock)
      }

    case 'UNBLOCK_USER':
      return {
        ...state,
        blocked: state.blocked.filter(user => user !== action.userToBlock)
      }

    case 'BEING_BLOCKED': 
    return {
      ...state,
      blockedBy: state.blockedBy.concat(action.userWhoBlocked)
    }

    case 'BEING_UNBLOCKED':
      return {
        ...state,
        blockedBy: state.blockedBy.filter(user => user !== action.userWhoBlocked)
      }

    case 'REMOVE_FROM_FAVORITES': 
      return {
        ...state,
        favorites: state.favorites.filter(favProfile => favProfile.username !== action.profile.username)
      }
    

    case 'TOGGLE_CHAT_ENABLED':
      return {
        ...state,
        profile: {
          ...state.profile,
          chatEnabled: action.enable
        }
      }

    case 'TOGGLE_PROFILE_VISIBLE':
      return {
        ...state,
        profile: {
          ...state.profile,
          visible: action.visible
        }
      }

    case 'TOGGLE_ONLINE':
      return {
        ...state,
        profile: {
          ...state.profile,
          online: action.online
        }
      }

    case 'FETCH_FAVORITES': 
    return {
      ...state,
      favorites: action.profiles
    }

    default:
      return state
  }
}