
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
        const query = `SELECT DISTINCT  books.id as id , books.imageurl as image ,books.title, books.type, 
        favorites.created_at as created  FROM favorites  JOIN books ON books.id = favorites.book_id WHERE favorites.user_id = ${user_id}  AND books.status = 1 ORDER BY favorites.id DESC ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`

        return db.execute(query)

    }

    getuserLibrary = ({ user_id, limit, page }) => {
        const query = `SELECT DISTINCT  books.id as id , books.imageurl as image ,books.title, books.type, 
           library.created_at as created  FROM library  JOIN books ON library.book_id = books.id WHERE library.user_id = ${user_id} AND books.status = 1 ORDER BY library.id DESC ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
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
        const query = `SELECT DISTINCT id , imageurl as image ,title, type,price , created_at as published  FROM books  WHERE userid =${user_id}  ORDER BY id DESC ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
        return db.execute(query)

    }
    getBooksByIds = (params) => {
        const { bookIds } = params
        const query = `SELECT * FROM books WHERE id IN (${bookIds}) `
        return db.execute(query)
    }

    getUserDrafts = ({ user_id, limit, page }) => {
        const query = `SELECT DISTINCT id , imageurl as image ,title, type,price , created_at as published  FROM books  WHERE userid =${user_id} AND status = 0 ORDER BY id DESC ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
        return db.execute(query)
    }

    getBooksOfWeeks = (params) => {
        const { limit, page } = params
        const query = `SELECT id,title,imageurl as image,description,price,(SELECT username from users where _id = userid) as author,(SELECT categoryName FROM bookcategories WHERE _id IN (category)) as categories,(SELECT COUNT(_id) FROM episodes where book_id = id) as parts,(SELECT AVG(rate) FROM rating where book_id = id) as rating, noOfReaders  FROM books ORDER BY noOfReaders DESC ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
        return db.execute(query)
    }


}