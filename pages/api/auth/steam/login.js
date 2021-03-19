import nextConnect from 'next-connect'

import auth from '../../../../middleware/auth'
import passport from '../../../../lib/passport'

const handler = nextConnect()

handler.use(auth).get(passport.authenticate('steam'), (req, res) => {
  res.json({ user: req.user })
})

export default handler
