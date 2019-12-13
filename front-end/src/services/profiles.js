
import axios from 'axios'

let token
const baseUrl = '/api/profiles'

const saveToken = tokenToSave => {
  token = 'bearer ' + tokenToSave
}

const searchProfiles = async (searchOptions) => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(`${baseUrl}/search`, searchOptions, config)
  return response.data
}

const searchProfile = async username => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(`${baseUrl}/searchOne`, { username }, config)
  return response.data
}

const fetchFavorites = async () => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.get(`${baseUrl}/favorites`, config)
  return response.data
}


export default { searchProfiles, searchProfile, fetchFavorites, saveToken }