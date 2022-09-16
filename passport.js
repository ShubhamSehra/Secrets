const dotenv = require ('dotenv');
const { Passport } = require('passport');
dotenv.config();
const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModule = require("./user") 
const findOrCreate = require('mongoose-findorcreate');
// const mongoose = require('mongoose');

// stup user
// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String
// })

// userSchema.plugin(findOrCreate)



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userModule.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    userModule.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
}
  ));
  // function(accessToken, refreshToken, profile, done) {
  //   done(null, profile)
  // }
  

module.exports = passport