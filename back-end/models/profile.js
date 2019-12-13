const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 4
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  profileText: {
    type: String
  },
  image: {
    imageUrl: String,
    id: String
  },
  chatEnabled: {
    type: Boolean,
    default: true
  },
  visible: {
    type: Boolean,
    default: true
  },
  online: {
    type: Boolean,
    default: false
  }
})

profileSchema.set('toJSON', { 
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile