
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

    searchBooksOrWriters({ search, limit, page }) {
        const query = `SELECT id , title , imageurl as image , category , type , userid , description , price FROM books WHERE title LIKE "%${search}%" OR description LIKE "%${search}%"  ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''} `
        return db.execute(query)
    }
    searchWriters({ search, limit, page }) {
        const query = `SELECT _id as id, email,username,profile_pic,coverPic as cover_pic,user_type,bio  FROM users WHERE email LIKE "%${search}%" OR username LIKE "%${search}%"  ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''} `
        return db.execute(query)
    }
}