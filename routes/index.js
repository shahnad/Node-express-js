const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login/success' ,authCtrl.successLogin)

router.get('/login/success/facebook' ,authCtrl.successFbLogin)

router.get('/getSliderImages',authCtrl.getSliderImages);

router.get('/booksAndwriters',authCtrl.booksandwriters);

// booksandwriters

module.exports = router;
