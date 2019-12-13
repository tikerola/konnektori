const User = require('../../../models/user')
const Profile = require('../../../models/profile')
const app = require('../../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const data = require('../../helperData/data')

const api = supertest(app)



describe('erasing user', () => {

  let user1

  beforeAll(async () => {

    await User.deleteMany({})
    await Profile.deleteMany({})
    
    await api
    .post('/api/user/signup')
    .send(data.newUser1)

    user1 = await api
    .post('/api/user/login')
    .send({ username: data.newUser1.username, password: data.newUser1.password })
    
  })

  it('should test erasing of users', async () => {

    
    const { token } = user1.body

    const response = await api
    .post('/api/user/eraseUser')
    .set('Authorization', 'bearer ' + token)
    .expect(200)

    const erasedUser = await User.findOne({ username: user1.body.username })
    const erasedProfile = await Profile.findOne({ username: user1.body.username })
    expect(response.text).toEqual(user1.body.username)
    expect(erasedUser).toEqual(null)
    expect(erasedProfile).toEqual(null)

  })


  afterAll( async () => {
    await mongoose.connection.close()
  })

})