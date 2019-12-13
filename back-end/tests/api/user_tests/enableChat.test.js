const User = require('../../../models/user')
const Profile = require('../../../models/profile')
const app = require('../../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const data = require('../../helperData/data')

const api = supertest(app)



describe('enable chat', () => {

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

  it('should test enabling chat', async () => {

    
    const { token } = user1.body

    const response = await api
    .post('/api/user/enableChat')
    .set('Authorization', 'bearer ' + token)
    .send({ enable: true })
    .expect(200)

    const changedUser = await User.findOne({ username: user1.body.username }).populate('profile')

    expect(changedUser.profile.chatEnabled).toEqual(true)

  })

  it('should test disabling chat', async () => {

    
    const { token } = user1.body

    const response = await api
    .post('/api/user/enableChat')
    .set('Authorization', 'bearer ' + token)
    .send({ enable: false })
    .expect(200)

    const changedUser = await User.findOne({ username: user1.body.username }).populate('profile')

    expect(changedUser.profile.chatEnabled).toEqual(false)

  })


  afterAll( async () => {
    await mongoose.connection.close()
  })

})