
const db = require('../db/connection')

module.exports = class userModel {

    constructor() {
    }


    // signup user
    userSignUp(data) {
        const { email, password, profile_pic, username } = data
        const query = `INSERT INTO users (email, password,profile_pic, username, created_at, updated_at) VALUES (?,?,?,?,?,?)`
        return db.execute(query, [email, password, profile_pic, username, new Date(), new Date()])
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

    createUserviagoogle = (params) => {
        const { name, picture, email } = params
        const query = `INSERT INTO users (email, username,profile_pic, created_at, updated_at) VALUES (?,?,?,?,?)`
        return db.execute(query, [email, name, picture, new Date(), new Date()])
    }

    followUser = (params) => {
        const { follower_id, followed_id } = params
        const query = `INSERT INTO followers (follower_id, followed_id, created_at, updated_at) VALUES (?,?,?,?)`
        return db.execute(query, [follower_id, followed_id, new Date(), new Date()])
    }
}