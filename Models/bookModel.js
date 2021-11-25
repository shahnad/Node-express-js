
const db = require('../db/connection')

module.exports = class bookModel {

    constructor() {
    }

    createNewBook(params) {
        const { title, imageurl, category, type, userid } = params
        const query = `INSERT INTO books (title, imageurl,category,userid, type, created_at, updated_at) VALUES (?,?,?,?,?,?,?)`
        return db.execute(query, [title, imageurl, category.join(), type, userid, new Date(), new Date()])
    }

    addNewEpisode(params) {
        const { episode_no, book_id, content, duration } = params
        console.log(params, 'params');
        const query = `INSERT INTO episodes (episode_no, book_id,content,duration, created_at, updated_at) VALUES (?,?,?,?,?,?)`
        return db.execute(query, [episode_no, book_id, content, duration, new Date(), new Date()])

    }

    rateMyEpisode(params) {
        const { book_id, rate, rated_user_id, episode_id } = params
        const query = `INSERT INTO rating (book_id, rate,rated_user_id, episode_id,created_at, updated_at) VALUES (?,?,?,?,?,?)`
        return db.execute(query, [book_id, rate, rated_user_id, episode_id, new Date(), new Date()])

    }


    getEpisodeByBook = (params) => {
        const { bookId, limit, offset } = params
        const query = `SELECT episodes._id,episodes.book_id,episodes.content,
        episodes.duration,episodes.created_at,reading.views FROM episodes  INNER JOIN reading ON episodes._id = reading.episode_id 
        WHERE episodes.book_id = ? `
        return db.execute(query, [bookId])
    }

    getBooksById = (params) => {
        const { userId } = params
        const query = `SELECT * FROM books WHERE userid = ?`
        return db.execute(query, [userId])

    }
    getEpisodeIdViews = (params) => {
        const { episode_id } = params
        const query = `SELECT * FROM reading WHERE episode_id = ?`
        return db.execute(query, [episode_id])

    }

    getEpisodeViews = (params) => {
        const { episdeIds } = params
        console.log(episdeIds, "episdeIds");
        const query = `SELECT * FROM reading WHERE episode_id IN (${episdeIds})`
        return db.execute(query)

    }
    getEpisodeViewByID = (params) => {
        const { episode_id, book_id } = params;
        const query = `SELECT COUNT(id) FROM reading WHERE episode_id = ?`
        return db.execute(query, [episode_id])
    }


    deleteSameBook = (params) => {
        const { book_id, episode_id, user_id } = params
        const query = `DELETE FROM reading WHERE book_id = ? AND episode_id = ? AND user_id = ?`
        return db.execute(query, [book_id, episode_id, user_id])

    }
    selectSingleEpisode = (params) => {
        const { episode_id } = params
        const query = `SELECT * FROM episodes WHERE _id = ?`
        return db.execute(query, [episode_id])
    }

    UpdateEpisodeView = (params) => {
        const { views, id } = params
        const query = `UPDATE reading SET views = ?  WHERE id = ?`
        return db.execute(query, [views, id])
    }

    getViewsData = (params) => {
        const { book_id, episode_id } = params
        const query = `SELECT * FROM reading  WHERE book_id = ? AND episode_id = ?`
        return db.execute(query, [book_id, episode_id])
    }


    readBook = (params) => {
        const { book_id, episode_id, user_id } = params
        const query = `INSERT INTO reading (book_id, episode_id,user_id, created_at, updated_at) VALUES (?,?,?,?,?)`
        return db.execute(query, [book_id, episode_id, user_id, new Date(), new Date()])
    }

    addToFavorite = (params) => {
        const { book_id, user_id } = params
        const query = `INSERT INTO favorites (book_id, user_id, created_at, updated_at) VALUES (?,?,?,?)`
        return db.execute(query, [book_id, user_id, new Date(), new Date()])
    }

    FavoriteBooks = (params) => {
        const { user_id } = params
        const query = `SELECT * FROM favorites WHERE user_id = ?`
        return db.execute(query, [user_id])

    }

    addToLibrary = (params) => {
        const { book_id, user_id } = params
        const query = `INSERT INTO library (book_id, user_id, created_at, updated_at) VALUES (?,?,?,?)`
        return db.execute(query, [book_id, user_id, new Date(), new Date()])
    }

    getMyLibarary = (params) => {
        const { user_id } = params
        const query = `SELECT * FROM library WHERE user_id = ?`
        return db.execute(query, [user_id])

    }
    getUserBooks = (params) => {
        const { user_id } = params
        const query = `SELECT * FROM books WHERE userid = ?`
        return db.execute(query, [user_id])

    }
}