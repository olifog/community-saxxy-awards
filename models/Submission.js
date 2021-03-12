import { ObjectId } from 'bson'
import mongoose from 'mongoose'

const SubmissionSchema = new mongoose.Schema({
  ownerids: {
    type: [ObjectId],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  youtubeId: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})

export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema)
