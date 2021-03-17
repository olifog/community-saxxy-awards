import nextConnect from 'next-connect'
import auth from '../../../middleware/auth'
import Vote from '../../../models/Vote'
import dbConnect from '../../../lib/dbConnect'
import { ObjectId } from 'bson'

const handler = nextConnect()

handler
  .use(auth)
  .get(async (req, res) => {
    await dbConnect()
    await Vote.findOne({ userid: ObjectId(req.user._id), submissionid: ObjectId(req.query.id) }).exec()
      .then((vote) => {
        res.json({ vote: vote.value })
      })
  })
  .put(async (req, res) => {
    await dbConnect()
    await Vote.findOneAndUpdate({ userid: ObjectId(req.user._id), submissionid: ObjectId(req.query.id) }, { value: req.body.value }, { new: true, upsert: true }).exec()
      .then((vote) => {
        res.json({ vote: vote.value })
      })
  })

export default handler
