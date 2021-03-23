import passport from 'passport'
import SteamStrategy from 'passport-steam'
import GoogleStrategy from 'passport-google-oauth20'

import User from '../models/User'
import dbConnect from './dbConnect'

const host = process.env.VERCEL_ENV === 'production'
  ? 'https://saxxys.com'
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

const steamData = {
  returnURL: `${host}/api/auth/steam/return/`,
  realm: `${host}/`,
  apiKey: process.env.STEAM_API_KEY
}

const googleData = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${host}/api/auth/google/return`,
  passReqToCallback: true
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
  new SteamStrategy(steamData, async (identifier, profile, done) => {
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

passport.use(
  new GoogleStrategy(googleData, async (req, accessToken, refreshToken, profile, done) => {
    console.log('hey hiya')
    console.log(accessToken)
    if (!req.user) return done(null, false)

    await dbConnect()

    User.findByIdAndUpdate(req.user._id, { googleid: profile.id, accessToken: accessToken, refreshToken: refreshToken }, (err, user) => {
      if (err) throw err
      return done(null, profile)
    })
  })
)

export default passport
