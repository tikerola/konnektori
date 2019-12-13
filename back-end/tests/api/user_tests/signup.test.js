
const User = require('../../../models/user')
const Profile = require('../../../models/profile')
const app = require('../../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const api = supertest(app)

describe('testing signup', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    await Profile.deleteMany({})

    const newUser = new User({
      username: 'maija',
      passwordHash: 'idontgiveashit',
      gender: 'female',
      age: 23,
      birthday: new Date()
    })

    await newUser.save()
  })

  it('should sign up with valid credentials', async () => {
    const newUser = {
      username: 'tero',
      password: 'sumussa',
      gender: 'male',
      age: 31,
      birthday: new Date()
    }

    const response = await api
      .post('/api/user/signup')
      .send(newUser)
      .expect(201)

    expect(response.body.username).toEqual('tero')

  })

  it('should fail when user by same username exists', async () => {
    const newUser = {
      username: 'maija',
      password: 'idontgiveashit',
      gender: 'female',
      age: 23,
      birthday: new Date()
    }

    const response = await api
      .post('/api/user/signup')
      .send(newUser)
      .expect(409)

  })

  afterAll( async () => {
    await mongoose.connection.close()
  })

})