
import axios from 'axios'

let token
const baseUrl = '/api/chat'

const saveToken = tokenToSave => {
  token = 'bearer ' + tokenToSave
}

const sendChatMessage = async message => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(`${baseUrl}`, message, config)
  return response.data
}


export default { sendChatMessage, saveToken }