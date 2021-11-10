const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/authController')
/*  POST LOGIN */
router.post('/login', authCtrl.login);


/* POST SIGNUP */
router.post('/signup', authCtrl.signUp);


/* POST SIGNUP */
router.post('/logout', authCtrl.logout);



module.exports = router;