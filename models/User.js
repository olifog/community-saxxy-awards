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
    type: String
  },
  countryCode: {
    type: String
  }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
