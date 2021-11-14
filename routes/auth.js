const express = require('express');
const passport = require('passport')

const router = express.Router();

const authCtrl = require('../controllers/authController')
/*  POST LOGIN */
router.post('/login', authCtrl.login);


/* POST SIGNUP */
router.post('/signup', authCtrl.signUp);


/* POST SIGNUP */
router.post('/logout', authCtrl.logout);

router.get('/facebook', passport.authenticate('facebook', { scope: 'email,user_photos' }));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

module.exports = router;