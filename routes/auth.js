const express = require('express');
const passport = require('passport')
const isAuth = require('../middleware/is-auth')
const authCtrl = require('../controllers/authController')

const router = express.Router();

//   login post
router.post('/login', authCtrl.login);

//  sign up post 
router.post('/signup', authCtrl.signUp);

//  logout  
router.post('/logout', authCtrl.logout);

// facebook
router.get('/facebook', passport.authenticate('facebook', { scope: 'email,user_photos' }));

// facebook callback
router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login/failure' }),
    function (req, res) {
        res.redirect('/login/success')
    }
);

// google
router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

// login fails
router.get('/login/failure', (req, res, next) => {
    res.status(401).send({
        data: {},
        message: 'Un Authorised'
    })
})

// google callback
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login/failure' }),
    function (req, res) {
      res.redirect('/login/success')
    })

// instagram
router.get('/instagram',
    passport.authenticate('instagram'));

// instagram callback
router.get('/instagram/callback',
    passport.authenticate('instagram', { successRedirect: '/', failureRedirect: '/auth/login', }));


module.exports = router;