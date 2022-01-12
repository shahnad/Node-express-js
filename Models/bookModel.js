
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
        const query = `SELECT id,title,imageurl as image,(SELECT categoryName FROM bookcategories WHERE _id IN (category)) as category,
        created_at as published_on,
        (SELECT AVG(rate) FROM rating WHERE rating.book_id = id) as rating,
        (SELECT SUM(views) FROM reading WHERE reading.id = id) as views,
        (SELECT SUM(duration) FROM episodes WHERE _id =id) as duration  
        FROM books WHERE userid = ${userId}`

        return db.execute(query)

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
        const query = `SELECT DISTINCT (SELECT id FROM books WHERE id = book_id) as id,COUNT(id) OVER()  as total, 
        (SELECT title FROM books WHERE id = book_id) as title,
        (SELECT type FROM books WHERE id = book_id) as type,
        (SELECT AVG(rate) FROM rating WHERE rating.id = book_id) as rating,
        (SELECT COUNT(id) FROM reading WHERE reading.book_id = favorites.book_id) as views,
        (SELECT SUM(duration) FROM episodes WHERE episodes.book_id = favorites.book_id) AS duration,
        (SELECT imageurl FROM books WHERE id = book_id) as image , created_at as created FROM favorites WHERE user_id = ${user_id}
        ORDER BY id DESC  ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`

        return db.execute(query)

    }

    getuserLibrary = ({ user_id, limit, page }) => {
        const query = `SELECT DISTINCT (SELECT id FROM books WHERE id = book_id) as id,COUNT(id) OVER()  as total, 
        (SELECT title FROM books WHERE id = book_id) as title,
        (SELECT type FROM books WHERE id = book_id) as type,
        (SELECT COUNT(id) FROM reading WHERE reading.book_id = id) as views,
        (SELECT AVG(rate) FROM rating WHERE rating.id = book_id) as rating,
        (SELECT SUM(duration) FROM episodes WHERE episodes.book_id = library.book_id) AS duration,
        (SELECT imageurl FROM books WHERE id = book_id) as image , created_at as created FROM library WHERE user_id = ${user_id}
        ORDER BY id DESC  ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
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
    getUserWrirings = (params) => {
        const { user_id, limit, page } = params
        const query = `SELECT DISTINCT id ,COUNT(id) OVER()  as total,  imageurl as image ,title, type,price ,
        (SELECT AVG(rate) FROM rating WHERE rating.id = id) as rating,
        (SELECT COUNT(id) FROM reading WHERE reading.book_id = id) as views,
        (SELECT SUM(duration) FROM episodes WHERE episodes.book_id = id) AS duration,
        created_at as created  FROM books  WHERE userid =${user_id} AND Status = 1 ORDER BY id DESC 
        ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
        return db.execute(query)

    }
    getBooksByIds = (params) => {
        const { bookIds } = params
        const query = `SELECT * FROM books WHERE id IN (${bookIds}) `
        return db.execute(query)
    }

    getUserDrafts = ({ user_id, limit, page }) => {
        const query = `SELECT DISTINCT id , COUNT(id) OVER()  as total,imageurl as image ,title, type,price ,
        (SELECT AVG(rate) FROM rating WHERE rating.id = id) as rating,
        (SELECT SUM(duration) FROM episodes WHERE episodes.book_id = id) AS duration,
        (SELECT COUNT(id) FROM reading WHERE reading.book_id = id) as views,
        created_at as created  FROM books  WHERE userid =${user_id} AND status = 0 ORDER BY id DESC
        ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
        return db.execute(query)
    }

    getBooksOfWeeks = (params) => {
        const { limit, page } = params
        const query = `SELECT id,title,imageurl as image,title,COUNT(id) OVER()  as total,description,price,
        (SELECT username from users where _id = userid) as author,(SELECT categoryName 
        FROM bookcategories WHERE _id IN (category)) as categories,(SELECT COUNT(_id) FROM episodes where book_id = id) as parts,
        (SELECT AVG(rate) FROM rating where book_id = id) as rating, noOfReaders  FROM books ORDER BY noOfReaders DESC 
        ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
        return db.execute(query)
    }

    latestReleases = (params) => {
        const { limit, page } = params
        const query = `SELECT id,title,imageurl as image,title,COUNT(id) OVER() as total,description,price,(SELECT username from users where _id = userid) as author,
        (SELECT categoryName FROM bookcategories WHERE _id IN (category)) as categories,
        (SELECT COUNT(_id) FROM episodes where book_id = id) as parts,(SELECT AVG(rate) FROM rating where book_id = id) as rating,
        noOfReaders  FROM books ORDER BY created_at DESC ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
        return db.execute(query)

    }

    trendingBooks = (params) => {
        const { limit, page } = params
        const query = `SELECT id,title,COUNT(id) OVER() as total,imageurl as image,description,price,(SELECT username from users where _id = userid) as author,
        (SELECT categoryName FROM bookcategories WHERE _id IN (category)) as categories,(SELECT COUNT(_id) FROM episodes where book_id = id) as parts,
        (SELECT AVG(rate) FROM rating where book_id = id) as rating, 
        noOfReaders  FROM books ORDER BY rating DESC ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
        return db.execute(query)
    }
    getBookDetailsById = (params) => {
        const { bookId, limit, page } = params
        const query = `SELECT DISTINCT _id  as id, episode_no, book_id ,
        COUNT(_id) OVER() as total,
        (SELECT title FROM books where books.id = book_id) as title , 
        (SELECT created_at FROM books where books.id = book_id) as published ,   
        (SELECT COUNT(id) FROM reading WHERE reading.book_id = book_id) as views,
        (SELECT AVG(rate) FROM rating where rating.book_id = book_id) as rating FROM episodes 
        WHERE book_id=${bookId} ORDER BY id ASC ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`

        return db.execute(query)

    }


}