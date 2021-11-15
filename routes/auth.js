const express = require('express');
const passport = require('passport')
const isAuth = require('../middleware/is-auth')

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

router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/login/failure', (req, res, next) => {
    res.status(401).send({
        data: {},
        message: 'Un Authorised'
    })
})

router.get('/login/success', isAuth ,authCtrl.successLogin)

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login/failure' }),
    function (req, res) { res.redirect('auth/login/success') })

router.get('/instagram',
    passport.authenticate('instagram'));

router.get('/instagram/callback',
    passport.authenticate('instagram', { successRedirect: '/', failureRedirect: '/auth/login', }));


module.exports = router;