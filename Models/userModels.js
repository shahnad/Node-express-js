
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

    getUserData = (params) => {
        const { user_id } = params
        const query = `SELECT * FROM users WHERE _id = ?`
        return db.execute(query, [user_id])

    }

    getUserFollowers = (params) => {
        const { user_id } = params
        const query = `SELECT * FROM followers WHERE followed_id = ?`
        return db.execute(query, [user_id])
    }


    getUserFollowedIds = (params) => {
        const { user_id } = params
        const query = `SELECT * FROM followers WHERE follower_id = ? ORDER BY id DESC`
        return db.execute(query, [user_id])
    }

    getUserRatings = (params) => {
        const { bookIds } = params
        const query = `SELECT * FROM rating WHERE book_id IN (${bookIds})`
        return db.execute(query)

    }

    userVistiProfile = (params) => {
        const { user_id, visitors_id } = params
        const query = `INSERT INTO profilevisitors (user_id, visitors_id, created_at, updated_at) VALUES (?,?,?,?)`
        return db.execute(query, [user_id, visitors_id, new Date(), new Date()])
    }

    profileVisited = (params) => {
        const { user_id } = params
        const query = `SELECT COUNT(id) FROM profilevisitors WHERE user_id = ?`;
        return db.execute(query, [user_id])
    }

    getUsersByIds = (params) => {
        const { userIds } = params
        const query = `SELECT email, username,profile_pic,gender,phone,user_type,bio,coverPic FROM users WHERE _id IN (${userIds})`
        return db.execute(query)
    }

    getPremiumWriters = () => {
        const user_type = 2
        const query = `SELECT users._id AS user_id, users.email, users.username, users.profile_pic, users.user_type, users.created_at AS JoinedDate, 
        rating.rate AS rating FROM users  INNER JOIN rating WHERE users._id = rating.writer_id AND users.user_type = ?`
        return db.execute(query,[user_type])
    }
}