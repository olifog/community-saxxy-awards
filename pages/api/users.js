import nextConnect from 'next-connect'

import User from '../../models/User'
import dbConnect from '../../lib/dbConnect'

const handler = nextConnect()

handler.get(async (req, res) => {
  await dbConnect()
  await User.find({}).exec()
    .then((users) => {
      res.json({ users: users.map(user => (user.steamid)) })
    })
})

export default handler
