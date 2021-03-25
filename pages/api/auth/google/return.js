import nextConnect from 'next-connect'

import auth from '../../../../middleware/auth'
import passport from '../../../../lib/passport'

const handler = nextConnect()

handler.use(auth).get(passport.authorize('google'), async (req, res) => {
  console.log(req.account)
  res.statusCode = 302
  res.setHeader('Location', '/user/submissions/new')
  res.end()
})

export default handler
