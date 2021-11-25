var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/userController')
const isAuth = require('../middleware/is-auth')

/* GET users listing. */
router.get('/', isAuth, userCtrl.getUsers);

// UPDATE USER
router.put('/user/updateUser', isAuth, userCtrl.updateUser)

// DELETE USER
router.delete('/user/deleteUser', isAuth, userCtrl.deleteUser)

// FOLLOW USER
router.post('/followUser', isAuth, userCtrl.followUser)


// get USER PROFILE
router.get('/getUserProfile', isAuth, userCtrl.getUserProfile)


module.exports = router;
