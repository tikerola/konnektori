
const loginData = {
  id: 1,
  username: 'timo',
  gender: 'male',
  age: 21,
  profile: { username: 'timo'},
  inbox: [],
  sent: [],
  token: '123abc',
  favorites: [],
  blockedBy: [],
  blocked: []
}

const login = () => {
  return Promise.resolve(loginData)
}

export default { login }