
const db = require('../db/connection')

module.exports = class bookModel {

    constructor() {
    }

    createNewBook(params) {
        const { title, imageurl, category, type, userid, status } = params
        const query = `INSERT INTO books (title, imageurl,category,userid, type, status, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)`
        return db.execute(query, [title, imageurl, category.join(), type, userid, status, new Date(), new Date()])
    }

    addNewEpisode(params) {
        const { episode_no, book_id, content, duration } = params
        console.log(params, 'params');
        const query = `INSERT INTO episodes (episode_no, book_id,content,duration, created_at, updated_at) VALUES (?,?,?,?,?,?)`
        return db.execute(query, [episode_no, book_id, content, duration, new Date(), new Date()])

    }

    rateMyEpisode(params) {
        const { book_id, rate, rated_user_id, episode_id, writer_id } = params
        const query = `INSERT INTO rating (book_id, rate,rated_user_id,writer_id, episode_id,created_at, updated_at) VALUES (?,?,?,?,?,?,?)`
        return db.execute(query, [book_id, rate, rated_user_id, episode_id, writer_id, new Date(), new Date()])

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
        const { user_id, limit, page } = params
        const query = `SELECT books.id as id ,books.imageurl as image, books.title as title, books.type FROM favorites INNER JOIN books WHERE books.id = favorites.book_id AND favorites.user_id = ${user_id} ORDER BY favorites.id DESC ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''} `
        return db.execute(query)

    }

    getuserLibrary = ({ user_id, limit, page }) => {
        const query = `SELECT  books.id as id , books.imageurl as image ,books.title, books.type, library.created_at as added_on FROM library INNER JOIN books WHERE books.id = library.book_id AND library.user_id = ${user_id} ORDER BY library.id DESC  ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''} `
        return db.execute(query)
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
        const { user_id, limit, page } = params
        const query = `SELECT id, title, imageurl as image , category, type , price , created_at as joined_on FROM books  WHERE userid = ${user_id}  ORDER BY id DESC  ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''} `
        return db.execute(query)

    }
    getBooksByIds = (params) => {
        const { bookIds } = params
        const query = `SELECT * FROM books WHERE id IN (${bookIds}) `
        return db.execute(query)
    }

    getUserDrafts = ({ user_id, limit, page }) => {
        const query = `SELECT books.id as book_id,books.title as title, books.imageurl as image , episodes._id as episode_id , episodes.created_at as writed_on ,episodes.status, episodes.episode_no FROM books INNER JOIN episodes WHERE  books.id = episodes.book_id AND books.userid = ${user_id} AND episodes.status= 0 ORDER BY episodes._id DESC ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
        return db.execute(query)
    }
}