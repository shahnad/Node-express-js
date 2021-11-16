const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login/success' ,authCtrl.successLogin)

module.exports = router;
