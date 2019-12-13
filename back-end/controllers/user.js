require('dotenv').config()
const userRouter = require('express').Router()
const User = require('../models/user')
const parser = require('../utils/cloudinary')()
const Profile = require('../models/profile')
const Message = require('../models/message')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const io = require('../socket/socket')
const clients = require('../utils/clients')
const moment = require('moment')

userRouter.post('/signup', async (req, res, next) => {
  const { username, password, gender, birthday, age } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newProfile = new Profile({
    username,
    gender,
    age,
    image: { imageUrl: gender === 'male' ? 'https://image.flaticon.com/icons/svg/145/145867.svg' : 'https://image.flaticon.com/icons/svg/145/145852.svg' },
    profileText: 'Nothing to show just yet'
  })

  try {

    const createdProfile = await newProfile.save()

    const newUser = new User({
      username,
      passwordHash,
      gender,
      age,
      birthday,
      profile: createdProfile._id
    })

    const savedUser = await newUser.save()
    return res.status(201).send(savedUser)
  }
  catch (error) {
    next(error)
  }

})

userRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username }).populate('profile').populate('favorites')
    const match = await bcrypt.compare(password, user.passwordHash)

    if (!user || !match) {
      return res.status(401).send('Unauthorized user')
    }

    const userForToken = {
      username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.JWT_SECRET)

    const yearsOld = moment().diff(user.birthday, 'years')
    
    if (yearsOld !== user.age) {
      user.profile.age = yearsOld
      user.age = yearsOld
      await user.save()
    }

    res.status(200).send({
      id: user._id,
      username: user.username,
      gender: user.gender,
      age: user.age === yearsOld ? user.age : yearsOld,
      profile: user.profile.toJSON(),
      inbox: user.inbox,
      sent: user.sent,
      token,
      favorites: user.favorites,
      blockedBy: user.blockedBy,
      blocked: user.blocked
    })
  } catch (error) {
    next(error)
  }
})

userRouter.post('/edit', async (req, res, next) => {
  const { profileText } = req.body

  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const profileToEdit = await Profile.findOne({ username: user.username })
    profileToEdit.profileText = profileText
    const editedProfile = await profileToEdit.save()
    
    return res.status(201).send(editedProfile)

  }
  catch (error) {
    next(error)
  }
})

userRouter.post('/image', parser.single("file"), async (req, res, next) => {

  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const profileToUpdate = await Profile.findOne({ username: user.username })

    const image = {
      imageUrl: req.file.secure_url,
      id: req.file.public_id
    }

    profileToUpdate.image = image
    await profileToUpdate.save()

    res.status(201).send(image)

  } catch (error) {
    next(error)
  }
})

userRouter.post('/addToFavorites', async (req, res, next) => {
  const { username, operation } = req.body

  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const userWithFavorites = await User.findById(user.id)
    const profileToAddOrRemove = await Profile.findOne({ username })

    if (operation === 'add') {
      userWithFavorites.favorites = userWithFavorites.favorites.concat(profileToAddOrRemove._id)
    }

    else {
      userWithFavorites.favorites = userWithFavorites.favorites.filter(favProfile => favProfile.toString() !== profileToAddOrRemove._id.toString())
    }

    await userWithFavorites.save()
    return res.status(201).send({ operation, profile: profileToAddOrRemove })

  } catch (error) {
    next(error)
  }

})

userRouter.post('/blockUser', async (req, res, next) => {
  const { userToBlock, block = true } = req.body

  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const blockingUser = await User.findById(user.id)
    const blockedUser = await User.findOne({ username: userToBlock })

    if (block) {
      blockingUser.blocked = blockingUser.blocked.concat(userToBlock)
      await blockingUser.save()

      blockedUser.blockedBy = blockedUser.blockedBy.concat(blockingUser.username)

      blockedUser.favorites = blockedUser.favorites.filter(profile => {
        return profile.toString() !== blockingUser.profile._id.toString()
      })

      await blockedUser.save()
    }

    else {
      blockingUser.blocked = blockingUser.blocked.filter(user => user !== userToBlock)
      await blockingUser.save()

      blockedUser.blockedBy = blockedUser.blockedBy.filter(user => user !== blockingUser.username)
      await blockedUser.save()
    }

    const id = clients[userToBlock]
    
    if (id)
      io.getIo().to(`${id}`).emit('block_user', { block, to: userToBlock, from: blockingUser.username })

    
    return res.status(200).send(userToBlock)

  } catch (error) {
    next(error)
  }

})

userRouter.post('/enableChat', async (req, res, next) => {
  const { enable } = req.body

  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const profile = await Profile.findOne({ username: user.username })
    profile.chatEnabled = enable
    await profile.save()

    return res.status(200).send(enable)

  } catch (error) {
    next(error)
  }
})

userRouter.post('/setVisible', async (req, res, next) => {
  const { visible } = req.body

  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const profile = await Profile.findOne({ username: user.username })
    profile.visible = visible
    await profile.save()

    return res.status(200).send(visible)

  } catch (error) {
    next(error)
  }
})

userRouter.post('/eraseUser', async (req, res, next) => {
  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    await User.findByIdAndDelete(user.id)
    await Profile.findOneAndDelete({ username: user.username })

    await Message.deleteMany({ receiver: user.username })
    await Message.updateMany({ author: user.username }, { $set: { author: `deleted_user (${user.username})`}})

    return res.status(200).send(user.username)

  } catch (error) {
    next(error)
  }
})


userRouter.post('/online', async (req, res, next) => {
  const { online } = req.body

  try {
    const user = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!user)
      throw new Error('Unauthorized')

    const profile = await Profile.findOne({ username: user.username })
    profile.online = online
    await profile.save()

    return res.status(200).send(online)

  } catch (error) {
    next(error)
  }
})



module.exports = userRouter