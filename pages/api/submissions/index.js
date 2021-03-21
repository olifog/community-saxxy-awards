import nextConnect from 'next-connect'

import Submission from '../../../models/Submission'
import dbConnect from '../../../lib/dbConnect'

const handler = nextConnect()

handler.get(async (req, res) => {
  await dbConnect()
  await Submission.find({}).exec()
    .then((submissions) => {
      res.json({ submissions: submissions.map(submission => (submission._id)) })
    })
})

export default handler
