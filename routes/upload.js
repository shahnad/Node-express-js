var express = require('express');
const uploadController = require('../controllers/uploadController');
const isAuth = require('../middleware/is-auth');
var router = express.Router();

router.post('/profilePic', uploadController.uploadProfilePic);

module.exports = router;
