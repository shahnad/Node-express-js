var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/userController')
const isAuth = require('../middleware/is-auth')

router.get('/', isAuth, userCtrl.getUsers);

router.put('/updateUser', isAuth, userCtrl.updateUser)

router.post('/uploadProfileImage', isAuth, userCtrl.uploadProfileImage)

router.post('/uploadCoverImage', isAuth, userCtrl.uploadCoverImage)

router.delete('/user/deleteUser', isAuth, userCtrl.deleteUser)

router.post('/followUser', isAuth, userCtrl.followUser)


router.get('/getUsersByIds', isAuth, userCtrl.getUserByIds)


router.get('/getUserProfile', isAuth, userCtrl.getUserProfile)


router.get('/getWriterProfile', userCtrl.getWriterProfile)


router.post('/visitProfile', isAuth, userCtrl.visitProfile)


router.get('/getPremiumWriters', userCtrl.getPremiumWriters)


router.get('/getFounderWriters', userCtrl.getFounderWriters)


router.get('/getTopWriters', userCtrl.getTopWriters)


router.get('/getuserFollowers', isAuth, userCtrl.getUserFollowers)

router.get('/getuserFollowings', isAuth, userCtrl.getUserFollowings)

router.get('/getuserWritings', isAuth, userCtrl.getuserWritings)

router.get('/getuserDrafts', isAuth, userCtrl.getUserDrafts)

router.get('/getuserFavoriteBooks', isAuth, userCtrl.getuserFavoriteBooks)

router.get('/getuserLibrary', isAuth, userCtrl.getuserLibrary)

router.get('/getBookCategories', isAuth, userCtrl.getBookCategories)

router.get('/getBookTypes', isAuth, userCtrl.getBookTypes)

router.get('/getUserBooksById', userCtrl.getUserBooksById);

router.get('/starWriters', userCtrl.starWriters);


module.exports = router;
