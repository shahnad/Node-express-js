
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
}