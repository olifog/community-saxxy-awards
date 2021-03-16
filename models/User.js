import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  steamid: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  profileUrl: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
