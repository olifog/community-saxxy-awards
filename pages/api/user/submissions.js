import nextConnect from 'next-connect'
import auth from '../../../middleware/auth'
import Submission from '../../../models/Submission'
import dbConnect from '../../../lib/dbConnect'
import { ObjectId } from 'bson'

const handler = nextConnect()

handler.use(auth).get(async (req, res) => {
  await dbConnect()
  await Submission.find({ ownerids: ObjectId(req.user._id) }).exec()
    .then((submissions) => {
      res.json({ submissions: submissions })
    })
})

export default handler
