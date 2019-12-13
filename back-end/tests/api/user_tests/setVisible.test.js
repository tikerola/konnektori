const User = require('../../../models/user')
const Profile = require('../../../models/profile')
const app = require('../../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const data = require('../../helperData/data')

const api = supertest(app)



describe('setting user visibility', () => {

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

  it('should test setting user hidden', async () => {

    
    const { token } = user1.body

    const response = await api
    .post('/api/user/setVisible')
    .set('Authorization', 'bearer ' + token)
    .send({ visible: false })
    .expect(200)

    const changedUser = await User.findOne({ username: user1.body.username }).populate('profile')

    expect(changedUser.profile.visible).toEqual(false)

  })

  it('should test setting user visible', async () => {

    
    const { token } = user1.body

    const response = await api
    .post('/api/user/setVisible')
    .set('Authorization', 'bearer ' + token)
    .send({ visible: true })
    .expect(200)

    const changedUser = await User.findOne({ username: user1.body.username }).populate('profile')

    expect(changedUser.profile.visible).toEqual(true)

  })


  afterAll( async () => {
    await mongoose.connection.close()
  })

})