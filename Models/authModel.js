
const db = require('../db/connection')

module.exports = class authModel {

    constructor() {
    }

    // validate login
    loginValidate(data) {
        const { email, password } = data
        const query = `SELECT _id, email, gender, created_at,updated_at FROM users WHERE email = ? AND password = ?`
        return db.execute(query, [email, password])
    }

    // find one
    findOne(data) {
        const { email } = data
        const query = `SELECT * FROM users WHERE email = ?`
        return db.execute(query, [email])
    }

    // find one by id
    findOneById(data) {
        const { id } = data
        const query = `SELECT * FROM users WHERE _id = ?`
        return db.execute(query, [id])
    }


    getSliderImages() {
        const query = `SELECT image FROM sliderimages ORDER BY id DESC`
        return db.execute(query)
    }

    searchBooks({ search, limit, page }) {
        const query = `SELECT id ,COUNT(id) OVER() as total, title , 
        imageurl as image , category ,
        (SELECT AVG(rate) FROM rating where book_id = id) as rating,
        type , userid , description ,
        (SELECT SUM(views) FROM reading WHERE book_id = id) as views,
        (SELECT SUM(duration) FROM episodes WHERE book_id =id) as duration, 
        price FROM books WHERE title LIKE "%${search}%" OR 
        description LIKE "%${search}%"  
        ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''} `
        return db.execute(query)
    }
    searchWriters({ search, limit, page }) {
        const query = `SELECT _id as id,COUNT(_id) OVER() as total,
        email,
        username,profile_pic as image,
        (SELECT AVG(rate) FROM rating where writer_id = _id) as rating,
        (SELECT COUNT(id) FROM followers where followed_id = _id) as followers,
        (SELECT COUNT(id) FROM books where userid = _id) as books,
        coverPic as cover_pic,user_type  FROM users WHERE email LIKE "%${search}%" OR
        username LIKE "%${search}%"  ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''} `
        return db.execute(query)
    }
}