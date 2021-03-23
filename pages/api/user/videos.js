import nextConnect from 'next-connect'

import auth from '../../../middleware/auth'
import dbConnect from '../../../lib/dbConnect'

const handler = nextConnect()

handler.use(auth).get(async (req, res) => {
  await dbConnect()
  console.log(req.user)
  console.log(req.account)
  res.json({ success: null })
})

export default handler
