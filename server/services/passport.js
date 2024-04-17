import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import "dotenv/config";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.PROJECT_URL}/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  return cb(null, {
    id: user.id,
    username: user.displayName,
    avatar: user.picture,
    email: user.email,
  });
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

export default passport;
