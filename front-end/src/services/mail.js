
import axios from 'axios'

let token
const baseUrl = '/api/messages'

const saveToken = tokenToSave => {
  token = 'bearer ' + tokenToSave
}

const fetchInbox = async () => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.get(`${baseUrl}/inbox`, config)
  return response.data
}

const fetchSent = async () => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.get(`${baseUrl}/sent`, config)
  return response.data
}

const reply = async data => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(`${baseUrl}/reply`, data, config)
  return response.data
}

const sendMail = async data => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(`${baseUrl}/send`, data, config)
  return response.data

}

const deleteMail = async (id, source)=> {
  const config = {
    headers: {
      Authorization: token
    }
  }


  const response = await axios.post(`${baseUrl}/delete`, { id, source }, config)
  return response.data
}

const setUnreadMailCount = async () => {
  const config = {
    headers: {
      Authorization: token
    }
  }


  const response = await axios.get(`${baseUrl}/unread`, config)
  return response.data
}

const setMailRead = async id => {
  const config = {
    headers: {
      Authorization: token
    }
  }


  const response = await axios.post(`${baseUrl}/read`, { id }, config)
  return response.data
}


export default { fetchInbox, fetchSent, reply, sendMail, deleteMail, setUnreadMailCount, setMailRead, saveToken }