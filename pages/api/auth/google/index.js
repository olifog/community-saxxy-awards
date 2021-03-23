import nextConnect from 'next-connect'

import auth from '../../../../middleware/auth'
import passport from '../../../../lib/passport'

const handler = nextConnect()

handler.use(auth).get(passport.authorize('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/youtube.readonly'] }), (req, res) => {
  if (!req.account) {
    res.statusCode = 302
    res.setHeader('Location', '/api/auth/steam/login')
    res.end()
  }
})

export default handler
