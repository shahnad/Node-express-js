
const db = require('../db/connection')

module.exports = class userModel {

    constructor() {
    }


    // signup user
    userSignUp(data) {
        const { email, password, gender, profile_pic } = data
        const query = `INSERT INTO users (email, password,profile_pic, gender, created_at, updated_at) VALUES (?,?,?,?,?,?)`
        return db.execute(query, [email, password, profile_pic, gender, new Date(), new Date()])
    }

    // update user
    updateUserProfile(data) {
        const { email, password, gender, id } = data
        const query = `UPDATE users SET email = ?, password = ?, gender = ?, updated_at = ? WHERE _id = ?`
        return db.execute(query, [email, password, gender, new Date(), id])
    }
    // user delete
    deleteUser(data) {
        const { id } = data
        const query = `DELETE FROM users WHERE _id = ?`
        return db.execute(query, [id])
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

    getCountOfallUsers() {
        const query = `SELECT COUNT(*) FROM users `
        return db.execute(query)
    }

    getUsers(params) {
        const { page, limit } = params
        const query = `SELECT * FROM users LIMIT ? OFFSET ?`
        return db.execute(query, [limit, page])
    }

}