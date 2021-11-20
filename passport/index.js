const passport = require('passport')
require('dotenv').config()
const facebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const userModel = require('../Models/userModels');

const userModelLink = new userModel()

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user)
});

// FACEBOOK
passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL

}, (token, refreshToken, profile, done) => {
    console.log(profile, 'profileprofileprofile');
    return done(null, profile)
}));

// GOOGLE
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
    userModelLink.findOne({ email: profile?._json?.email }).then(([rows, fieldData]) => {
        if (!rows.length) {
            userModelLink.createUserviagoogle(profile?._json).then(([rows]) => {
               
            }).catch((error) => {
                console.log(error, 'errorerrorerror');
            })
        }
        return done(null, profile);
    })
}
));

// instagram
passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: process.env.INSTAGRAM_CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, user);
    }
));

