const User = require('../../../models/user')
const Message = require('../../../models/message')
const Profile = require('../../../models/profile')
const app = require('../../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const api = supertest(app)

describe('testing messages', () => {

  let newUser1
  let newUser2
  let tero
  let minna

  beforeAll(async () => {
    await User.deleteMany({})
    await Message.deleteMany({})
    await Profile.deleteMany({})

    newUser1 = {
      username: 'tero',
      password: 'sumussa',
      gender: 'male',
      age: 23,
      birthday: new Date()
    }

    newUser2 = {
      username: 'minna',
      password: 'sumussa',
      gender: 'female',
      age: 23,
      birthday: new Date()
    }

    const result = await api
      .post('/api/user/signup')
      .send(newUser1)


    await api
      .post('/api/user/signup')
      .send(newUser2)


      tero = await api
      .post('/api/user/login')
      .send({ username: newUser1.username, password: newUser1.password })

      minna = await api
      .post('/api/user/login')
      .send({ username: newUser2.username, password: newUser2.password })
  })

  it('should be able to create a message', async () => {
   
    const { token, username } = tero.body

    const newMessage = {
      title: "hei, me lennetään",
      content: "no eino wiseguy",
      username: newUser2.username
    }

    const response = await api
      .post('/api/messages/send')
      .set('Authorization', 'bearer ' + token)
      .send(newMessage)
      .expect(201)

    expect(response.body.title).toEqual('hei, me lennetään')
    expect(response.body.author).toEqual(username)
    expect(response.body.receiver).toEqual(newUser2.username)

    const author = await User.findOne({ username }).populate('sent')
    expect(author.sent[0].title).toEqual('hei, me lennetään')

    const receiver = await User.findOne({ username: newUser2.username }).populate('inbox')
    expect(receiver.inbox[0].title).toEqual('hei, me lennetään')
  })

  it('should be able to fetch inbox', async () => {

    const { token } = tero.body

    const response = await api
      .get('/api/messages/inbox')
      .set('Authorization', 'bearer ' + token)

    expect(response.body).toEqual([])

  })

  it('should be able to fetch sent mail', async () => {
    const { token } = tero.body

    const response = await api
      .get('/api/messages/sent')
      .set('Authorization', 'bearer ' + token)
    
    expect(response.body[0].title).toEqual('hei, me lennetään')
  })

  it('should get the count of unread mail', async () => {

    const { token } = minna.body

    const response = await api
      .get('/api/messages/unread')
      .set('Authorization', 'bearer ' + token)

    expect(response.body.count).toBe(1)

  })

  it('should mark message read', async () => {

    const { token } = tero.body

    const message = await Message.findOne({ author: newUser1.username })
    expect(message.read).toEqual(false)

    const response = await api
      .post('/api/messages/read')
      .set('Authorization', 'bearer ' + token)
      .send({ id: message._id })

    expect(response.body.read).toEqual(true)

  })

  it('should be able to delete messages from inbox', async () => {
    const { token } = tero.body

    const message = await Message.findOne({ author: newUser1.username })

    const response = await api
      .post('/api/messages/delete')
      .set('Authorization', 'bearer ' + token)
      .send({ id: message._id, source: 'sent' })
      .expect(204)
    
    const author = await User.findOne({ username: message.author })
    expect(author.sent.length).toEqual(0)

    const receiver = await User.findOne({ username: message.receiver })
    expect(receiver.inbox.length).toEqual(1)
    
  })

  it('should delete the message once its in no ones inbox and sent mail', async () => {

    const { token } = minna.body
    const message = await Message.findOne({ author: newUser1.username })

    const messagesCount = await Message.find({}).countDocuments()
    expect(messagesCount).toBe(1)

    const response = await api
      .post('/api/messages/delete')
      .set('Authorization', 'bearer ' + token)
      .send({ id: message._id, source: 'inbox' })
      .expect(204)
    
    const author = await User.findOne({ username: message.author })
    expect(author.sent.length).toEqual(0)

    const receiver = await User.findOne({ username: message.receiver })
    expect(receiver.inbox.length).toEqual(0)

    const messages = await Message.find({})
    
    expect(messages).toEqual([])
  })

  

  afterAll( async () => {
    await mongoose.connection.close()
  })
})