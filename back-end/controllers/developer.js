const faker = require('faker')
const developerRouter = require('express').Router()
const User = require('../models/user')
const Profile = require('../models/profile')
const Message = require('../models/message')

developerRouter.post('/fake', async (req, res, next) => {
  const { fakeAmount } = req.body

  for (let i = 0; i < fakeAmount; i++) {

    const gender = Math.random() > 0.5 ? 'male' : 'female'
    const age = 18 + Math.floor(Math.random() * (99 - 18))
    const passwordHash = faker.date.future()
    const username = faker.name.firstName(gender)
    const text = faker.lorem.paragraph(7)
    const image = faker.image.avatar()
    

    const newProfile = new Profile({
      username,
      gender,
      age,
      image: { imageUrl: image },
      profileText: text
    })

    try {

      const createdProfile = await newProfile.save()

      const newUser = new User({
        username,
        passwordHash,
        gender,
        age,
        profile: createdProfile._id
      })

      await newUser.save()
    }
    catch (error) {
      console.log(error)
    }
    
  }
  return res.status(201).send('Successfull Addition')
})

developerRouter.delete('/', async (req, res, next) => {
  await Message.deleteMany({})
  
  await Profile.deleteMany({username: { $nin: ['timo', 'hanna'] }})
  await User.deleteMany({ username: { $nin: ['timo', 'hanna'] }})
  //await Profile.deleteMany({})
  //await User.deleteMany({})
  res.status(200).send('Deletion successful')
})

module.exports = developerRouter