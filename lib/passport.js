import passport from "passport";
import SteamStrategy from "passport-steam";

const dev = process.env.NODE_ENV === "development";
const host = dev ? "http://localhost:3000" : process.env.DOMAIN;

const data = {
    returnURL: `${host}/api/return/`,
    realm: `${host}/`,
    apiKey: process.env.STEAM_API_KEY
}

passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  console.log(obj);
  done(null, obj)
})

passport.use(
  new SteamStrategy(data, (identifier, profile, done) => {
    User.findByOpenID({ openId: identifier }, function (err, user) {
      return done(err, user);
    });
  })
);

export default passport;