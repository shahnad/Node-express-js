const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/bookController')
/*  POST LOGIN */
router.post('/create/book', authCtrl.createBook);




module.exports = router;