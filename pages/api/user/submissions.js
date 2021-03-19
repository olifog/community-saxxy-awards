import nextConnect from 'next-connect'
import { ObjectId } from 'bson'

import auth from '../../../middleware/auth'
import Submission from '../../../models/Submission'
import dbConnect from '../../../lib/dbConnect'

const handler = nextConnect()

handler.use(auth).get(async (req, res) => {
  await dbConnect()
  await Submission.find({ ownerids: ObjectId(req.user._id) }).exec()
    .then((submissions) => {
      res.json({ submissions: submissions })
    })
})

export default handler
