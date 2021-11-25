
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
        const { episode_no, book_id, content } = params
        const query = `INSERT INTO episodes (episode_no, book_id,content, created_at, updated_at) VALUES (?,?,?,?,?)`
        return db.execute(query, [episode_no, book_id, content, new Date(), new Date()])

    }

    rateMyEpisode(params) {
        const { book_id, rate, rated_user_id, episode_id } = params
        const query = `INSERT INTO rating (book_id, rate,rated_user_id, episode_id,created_at, updated_at) VALUES (?,?,?,?,?,?)`
        return db.execute(query, [book_id, rate, rated_user_id, episode_id, new Date(), new Date()])

    }


    getEpisodeByBook = (params) => {
        const { bookId, limit, offset } = params
        const query = `SELECT * FROM episodes WHERE book_id = ? LIMIT ? OFFSET ?`
        return db.execute(query, [bookId, limit, offset])
    }

    getBooksById = (params) => {
        const { userId } = params
        const query = `SELECT * FROM books WHERE userid = ?`
        return db.execute(query, [userId])

    }

    getEpisodeViews = (params) => {
        const { episodeId, bookId } = params
        const query = `SELECT COUNT(id) count FROM reading where episode_id = ?`
        return db.execute(query, [episodeId,])

    }
    deleteSameBook = (params) => {
        const { book_id, episode_id, user_id } = params
        const query = `DELETE FROM reading WHERE book_id = ? AND episode_id = ? AND user_id = ?`
        return db.execute(query, [book_id, episode_id, user_id])

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
}