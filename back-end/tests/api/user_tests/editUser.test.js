const User = require('../../../models/user')
const Profile = require('../../../models/profile')
const Message = require('../../../models/message')
const app = require('../../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const data = require('../../helperData/data')

const api = supertest(app)


describe('profile edit', () => {
  beforeEach(async () => {

    await User.deleteMany({})
    await Profile.deleteMany({})
    await Message.deleteMany({})
    
    await api
    .post('/api/user/signup')
    .send(data.newUser1)
    
  })

  it('should test editing of profile text', async () => {
    const user = await api
    .post('/api/user/login')
    .send({ username: data.newUser1.username, password: data.newUser1.password })

    const { token } = user.body

    const response = await api
    .post('/api/user/edit')
    .set('Authorization', 'bearer ' + token)
    .send({ profileText: 'A super cute girl'})
    .expect(201)

    expect(response.body.profileText).toEqual('A super cute girl')

  })


  afterAll( async () => {
    await mongoose.connection.close()
  })

})