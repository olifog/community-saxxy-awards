import passport from "passport";
import SteamStrategy from "passport-steam";

const dev = process.env.NODE_ENV === "development";
const host = dev ? "http://localhost:3000" : process.env.VERCEL_URL;

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
    return done(null, profile);
  })
);

export default passport;