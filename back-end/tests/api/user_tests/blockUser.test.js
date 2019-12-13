const User = require('../../../models/user')
const Profile = require('../../../models/profile')
const Message = require('../../../models/message')
const app = require('../../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const data = require('../../helperData/data')

const api = supertest(app)

describe('block user', () => {

  let user1
  let user2

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

  it('should test blocking of users', async () => {

    const { token } = user1.body

    const response = await api
    .post('/api/user/blockUser')
    .set('Authorization', 'bearer ' + token)
    .send({ userToBlock: user2.body.username, block: true })
    expect(200)

    expect(response.text).toEqual(user2.body.username)

    const userWhoBlocked = await User.findOne({ username: user1.body.username })
    expect(userWhoBlocked.blocked.length).toBe(1)

    const userWhoWasBlocked = await User.findOne({ username: user2.body.username })
    expect(userWhoWasBlocked.blockedBy.length).toBe(1)

  })

  it('should test unblocking of users', async () => {

    const { token } = user1.body

    const response = await api
    .post('/api/user/blockUser')
    .set('Authorization', 'bearer ' + token)
    .send({ userToBlock: user2.body.username, block: false })
    expect(200)

    expect(response.text).toEqual(user2.body.username)

    const userWhoUnBlocked = await User.findOne({ username: user1.body.username })
    expect(userWhoUnBlocked.blocked.length).toBe(0)

    const userWhoWasUnBlocked = await User.findOne({ username: user2.body.username })
    expect(userWhoWasUnBlocked.blockedBy.length).toBe(0)

  })


  afterAll( async () => {
    await mongoose.connection.close()
  })

})