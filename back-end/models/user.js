const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  passwordHash: {
    type: String,
    required: true
  },
  gender: { 
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  inbox: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  sent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  blockedBy: [String],
  blocked: [String]
})

userSchema.set('toJSON', { 
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User