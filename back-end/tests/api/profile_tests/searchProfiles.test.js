const User = require('../../../models/user')
const Profile = require('../../../models/profile')
const app = require('../../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const data = require('../../helperData/data')

const api = supertest(app)

describe('search profiles', () => {

  let user1
  let user2

  beforeAll(async () => {

    await User.deleteMany({})
    await Profile.deleteMany({})
    
    await api
    .post('/api/user/signup')
    .send(data.newUser1)

    await api
    .post('/api/user/signup')
    .send(data.newUser2)

    await api
    .post('/api/user/signup')
    .send(data.newUser3)

    user1 = await api
    .post('/api/user/login')
    .send({ username: data.newUser1.username, password: data.newUser1.password })

    user2 = await api
    .post('/api/user/login')
    .send({ username: data.newUser2.username, password: data.newUser2.password })
    
  })

  it('should test searching profiles v1', async () => {

    
    const { token } = user1.body

    const age = [23, 24]
    const gender = 'female'

    const response = await api
    .post('/api/profiles/search')
    .set('Authorization', 'bearer ' + token)
    .send({ age, gender })
    .expect(200)

    expect(response.body.count).toBe(1)
    expect(response.body.profiles[0].username).toEqual('minna')

  })

  it('should test searching profiles v2', async () => {

    
    const { token } = user1.body

    const age = [23, 33]
    const gender = 'female'

    const response = await api
    .post('/api/profiles/search')
    .set('Authorization', 'bearer ' + token)
    .send({ age, gender })
    .expect(200)

    expect(response.body.count).toBe(2)
    expect(response.body.profiles[0].username).toEqual('henriikka')

  })


  it('should test searching profiles v3', async () => {

    
    const { token } = user1.body

    const age = [24, 30]
    const gender = 'female'

    const response = await api
    .post('/api/profiles/search')
    .set('Authorization', 'bearer ' + token)
    .send({ age, gender })
    .expect(200)

    expect(response.body.count).toBe(0)
    expect(response.body.profiles).toEqual([])

  })

  it('should search certain profile by username', async () => {

    const { token } = user1.body

    const response = await api
    .post('/api/profiles/searchOne')
    .set('Authorization', 'bearer ' + token)
    .send({ username: data.newUser2.username })
    .expect(200)

    expect(response.body.username).toEqual(data.newUser2.username)
  })

  it('should not find own profile', async () => {

    const { token } = user1.body

    const response = await api
    .post('/api/profiles/searchOne')
    .set('Authorization', 'bearer ' + token)
    .send({ username: data.newUser1.username })
    .expect(400)

  })


  it('should get favorites', async () => {
    const { token } = user1.body

    const user = await User.findOne({ username: user1.body.username })
    user.favorites = user.favorites.concat(user2.body.profile.id)
    await user.save()

    const response = await api
    .get('/api/profiles/favorites')
    .set('Authorization', 'bearer ' + token)
    .expect(200)

    expect(response.body.length).toBe(1)
    expect(response.body[0].username).toEqual(user2.body.username)

  })


  afterAll( async () => {
    await mongoose.connection.close()
  })

})