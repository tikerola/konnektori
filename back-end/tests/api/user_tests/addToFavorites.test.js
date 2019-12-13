const User = require('../../../models/user')
const Profile = require('../../../models/profile')
const Message = require('../../../models/message')
const app = require('../../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const data = require('../../helperData/data')

const api = supertest(app)
let user1
let user2

describe('adding to favorites', () => {
  beforeAll(async () => {

    await User.deleteMany({})
    await Profile.deleteMany({})
    await Message.deleteMany({})
    
    await api
    .post('/api/user/signup')
    .send(data.newUser1)

    await api
    .post('/api/user/signup')
    .send(data.newUser2)

    user1 = await api
    .post('/api/user/login')
    .send({ username: data.newUser1.username, password: data.newUser1.password })

    user2 = await api
    .post('/api/user/login')
    .send({ username: data.newUser2.username, password: data.newUser2.password })
    
    
  })

  it('should test adding a user to favorites', async () => {

    const { token } = user1.body

    const response = await api
    .post('/api/user/addToFavorites')
    .set('Authorization', 'bearer ' + token)
    .send({ username: data.newUser2.username, operation: 'add' })
    .expect(201)

    expect(response.body.profile.username).toEqual(user2.body.username)

    const userwithAdded = await User.findOne({ username: user1.body.username }).populate('favorites')

    expect(userwithAdded.favorites.length).toBe(1)
    expect(userwithAdded.favorites[0].username).toBe(user2.body.username)

  })

  it('should test removing a user from favorites', async () => {
    
    const { token } = user1.body

    const response = await api
    .post('/api/user/addToFavorites')
    .set('Authorization', 'bearer ' + token)
    .send({ username: data.newUser2.username, operation: 'remove' })
    .expect(201)

    expect(response.body.profile.username).toEqual(user2.body.username)
    expect(response.body.operation).toEqual('remove')

    const userwithRemoved = await User.findOne({ username: user1.body.username }).populate('favorites')
    
    expect(userwithRemoved.favorites.length).toBe(0)
    

  })


  afterAll( async () => {
    await mongoose.connection.close()
  })

})