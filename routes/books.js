const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/bookController')


/* Create Story*/
router.post('/createStory', bookCtrl.createBook);


/* Add New Episode*/
router.post('/addNewEpisode', bookCtrl.addEpisode);


/* Add New Episode*/
router.post('/rateEpisode', bookCtrl.rateEpisode);



module.exports = router;