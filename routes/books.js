const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/bookController')

/* Create Story*/
router.post('/createStory', bookCtrl.createBook);


/* add New Episode*/
router.post('/addNewEpisode', bookCtrl.addEpisode);


/* rate Episode*/
router.post('/rateEpisode', bookCtrl.rateEpisode);


/* get Episode By Book*/
router.get('/getEpisodeByBook', bookCtrl.getEpisodeByBook);


/* get Books ById*/
router.get('/getBooksById', bookCtrl.getBooksById);


/* read Book*/
router.post('/readBook', bookCtrl.readBook);

/* add To Favorite*/
router.post('/addToFavorite', bookCtrl.addToFavorite);


/* add To Library*/
router.post('/addToLibrary', bookCtrl.addToLibrary);


/*  getBooksByIds*/
router.get('/getBooksByIds', bookCtrl.getBooksByIds);



/*  getbooksOftheWeeks*/
router.get('/getbooksOftheWeeks', bookCtrl.getBooksOftheWeeks);


// latestReleases
router.get('/latestReleases', bookCtrl.latestReleases);


// trendingBooks
router.get('/trendingBooks', bookCtrl.trendingBooks);





module.exports = router;