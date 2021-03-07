import passport from 'passport'
import SteamStrategy from 'passport-steam'

import User from '../models/User'
import dbConnect from './dbConnect'

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

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(
  new SteamStrategy(data, async (identifier, profile, done) => {
    const newUser = {
      steamid: profile.id,
      name: profile.displayName,
      imageUrl: profile.photos[2].value
    }

    await dbConnect()

    User.findOneAndUpdate({ steamid: profile.id }, newUser, { new: true, upsert: true }, (err, user) => {
      if (err) {
        throw err
      }
      return done(null, user)
    })
  })
)

export default passport
