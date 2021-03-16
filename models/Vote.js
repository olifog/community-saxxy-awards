import mongoose from 'mongoose'
import { ObjectId } from 'bson'

const VoteSchema = new mongoose.Schema({
  userid: {
    type: ObjectId,
    required: true
  },
  submissionid: {
    type: ObjectId,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
})

export default mongoose.models.Vote || mongoose.model('Vote', VoteSchema)
