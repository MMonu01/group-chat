import passport from "passport";
import generator from "generate-password";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import "dotenv/config";
import { userModel } from "../model/user-model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.PROJECT_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await userModel.findOne({ email: profile.email });
      if (!user) {
        const password = generator.generate({
          length: 10,
          numbers: true,
          symbols: true,
        });

        const user_obj = { username: profile.displayName, email: profile.email, password, avatar: profile.picture };
        const new_user = new userModel(user_obj);
        await new_user.save();
      }
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
