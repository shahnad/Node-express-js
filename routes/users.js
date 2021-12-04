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


// Get User By Ids
router.get('/getUsersByIds', isAuth, userCtrl.getUserByIds)


// Get USER PROFILE
router.get('/getUserProfile', isAuth, userCtrl.getUserProfile)



// Post USER PROFILE
router.post('/visitProfile', isAuth, userCtrl.visitProfile)


//Get Premium Writers
router.get('/getPremiumWriters', isAuth, userCtrl.getPremiumWriters)



//Get Premium Writers
router.get('/getFounderWriters', isAuth, userCtrl.getFounderWriters)

//Get Top Writers
router.get('/getTopWriters', isAuth, userCtrl.getTopWriters)


//Get Top Writers
router.get('/getuserFollowers', isAuth, userCtrl.getUserFollowers)

//Get Top Writers
router.get('/getuserFollowings', isAuth, userCtrl.getUserFollowings)

router.get('/getuserWritings', isAuth, userCtrl.getuserWritings)

router.get('/getuserDrafts', isAuth, userCtrl.getUserDrafts)

router.get('/getuserFavoriteBooks', isAuth, userCtrl.getuserFavoriteBooks)

router.get('/getuserLibrary', isAuth, userCtrl.getuserLibrary)

router.get('/getBookCategories', isAuth, userCtrl.getBookCategories)

router.get('/getBookTypes', isAuth, userCtrl.getBookTypes)

// 


module.exports = router;
