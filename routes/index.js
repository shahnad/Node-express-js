const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController')
const {  getFileStream } = require('../s3_config')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login/success' ,authCtrl.successLogin)

router.get('/login/success/facebook' ,authCtrl.successFbLogin)

router.get('/getSliderImages',authCtrl.getSliderImages);

router.get('/booksAndwriters',authCtrl.booksandwriters);


router.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

// booksandwriters

module.exports = router;
