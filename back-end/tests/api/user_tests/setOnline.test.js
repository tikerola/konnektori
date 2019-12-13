const User = require('../../../models/user')
const Profile = require('../../../models/profile')
const app = require('../../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const data = require('../../helperData/data')

const api = supertest(app)



describe('set online', () => {

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

  it('should test setting user online', async () => {

    
    const { token } = user1.body

    const response = await api
    .post('/api/user/online')
    .set('Authorization', 'bearer ' + token)
    .send({ online: true })
    .expect(200)

    const changedUser = await User.findOne({ username: user1.body.username }).populate('profile')

    expect(changedUser.profile.online).toEqual(true)

  })

  it('should test setting user offline', async () => {

    
    const { token } = user1.body

    const response = await api
    .post('/api/user/online')
    .set('Authorization', 'bearer ' + token)
    .send({ online: false })
    .expect(200)

    const changedUser = await User.findOne({ username: user1.body.username }).populate('profile')

    expect(changedUser.profile.online).toEqual(false)

  })


  afterAll( async () => {
    await mongoose.connection.close()
  })

})