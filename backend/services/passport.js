const passport = require('passport');
const googleStragategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new googleStragategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: './auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const existingUser = await User.findOne({ googleid: profile.id });

      if (existingUser) {
        console.log('past user');
        return done(null, existingUser);
      }
      console.log('new user');
      const user = new User({
        googleid: profile.id,
        name: {
          familyName: profile.name.familyName,
          givenName: profile.name.givenName
        },
        profilePic: profile.photos[0].value || '',
        pinlist: [],
        status: 0
      });
      await user.save();
      done(null, user);
    }
  )
);
