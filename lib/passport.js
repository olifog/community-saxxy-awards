import passport from 'passport'
import SteamStrategy from 'passport-steam'

const dev = process.env.NODE_ENV === 'development'
const prod = process.env.VERCEL_ENV === 'production'
const host = dev
  ? 'http://localhost:3000'
  : prod
    ? 'https://saxxys.com'
    : `https://${process.env.VERCEL_URL}`

const data = {
  returnURL: `${host}/api/return/`,
  realm: `${host}/`,
  apiKey: process.env.STEAM_API_KEY
}

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(
  new SteamStrategy(data, (identifier, profile, done) => {
    // update database here in future
    return done(null, profile)
  })
)

export default passport
