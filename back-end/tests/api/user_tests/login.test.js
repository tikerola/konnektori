const User = require('../../../models/user')
const Profile = require('../../../models/profile')
const app = require('../../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const api = supertest(app)

describe('testing login', () => {
  beforeEach(async () => {

    await User.deleteMany({})
    await Profile.deleteMany({})
    
    await api
      .post('/api/user/signup')
      .send({
        username: 'timo',
        password: 'kauluri',
        gender: 'male',
        age: 23,
        birthday: new Date()
      })
  })

  it('should login with good credentials', async () => {
    const response = await api
      .post('/api/user/login')
      .send({
        username: 'timo',
        password: 'kauluri'
      })
      .expect(200)

    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('username')

  })

  it('should fail login with wrong credentials', async () => {
    await api
      .post('/api/user/login')
      .send({
        username: 'timo',
        password: 'autotalli'
      })
      .expect(401)
  })

  afterAll( async () => {
    await mongoose.connection.close()
  })

})