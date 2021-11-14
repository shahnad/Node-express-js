const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/bookController')


/* Create Story*/
router.post('/createStory', bookCtrl.createBook);




module.exports = router;