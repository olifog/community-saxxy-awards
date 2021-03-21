import passport from 'passport'
import SteamStrategy from 'passport-steam'

import User from '../models/User'
import dbConnect from './dbConnect'

const host = process.env.VERCEL_ENV === 'production'
  ? 'https://saxxys.com'
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://localhost:3000'

const data = {
  returnURL: `${host}/api/auth/steam/return/`,
  realm: `${host}/`,
  apiKey: process.env.STEAM_API_KEY
}

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  await dbConnect()
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(
  new SteamStrategy(data, async (identifier, profile, done) => {
    const newUser = {
      steamid: profile.id,
      name: profile.displayName,
      imageUrl: profile.photos[2].value,
      profileUrl: profile._json.profileurl,
      countryCode: profile._json.loccountrycode
    }

    await dbConnect()

    User.findOneAndUpdate({ steamid: profile.id }, newUser, { new: true, upsert: true }, (err, user) => {
      if (err) throw err
      return done(null, user)
    })
  })
)

export default passport
