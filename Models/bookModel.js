
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

    getEpisodeViews = async (params) => {
        const { episodeId, bookId } = params
        const status = 1
        const query = `SELECT COUNT(id) count FROM reading where episode_id = ? AND readed = ? AND book_id = ?`
        return await db.execute(query, [episodeId, status, bookId])

    }

}