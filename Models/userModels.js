
const { log } = require('npmlog')
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
        const query = `SELECT * FROM users ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
        return db.execute(query,)
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
        const query = `SELECT _id as user_id,email, username,profile_pic,gender,user_type,bio,coverPic,created_at as joined_date  FROM users WHERE _id = ?`
        return db.execute(query, [user_id])

    }

    getUserFollowers = (params) => {
        const { user_id, limit, page } = params
        const query = `SELECT * FROM followers WHERE followed_id = ${user_id} ORDER BY id DESC ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
        return db.execute(query)
    }


    getUserFollowedIds = (params) => {
        const { user_id, limit, page } = params
        const query = `SELECT * FROM followers WHERE follower_id = ${user_id}  ORDER BY id DESC  ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
        return db.execute(query)
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
        const query = `SELECT _id ,email, username,profile_pic,gender,phone,user_type,bio,coverPic FROM users WHERE _id IN (${userIds})`
        return db.execute(query)
    }

    WritersByID = ({ user_type, limit, page }) => {
        let queries = [user_type]
        let query = `SELECT users._id AS user_id, users.email, users.username, users.profile_pic, users.user_type, users.created_at AS joinedDate, 
        rating.rate AS rating FROM users  INNER JOIN rating WHERE users._id = rating.writer_id AND users.user_type = ? ${limit ? `LIMIT ${parseInt(limit)} OFFSET ${parseInt(page)}` : ''}`
        return db.execute(query, queries)
    }

    getTopWriters = ({ limit, page }) => {
        let queries = []
        let query = `SELECT users._id AS user_id, users.email, users.username, users.profile_pic, users.user_type, users.created_at AS joinedDate, 
        rating.rate AS rating FROM users  INNER JOIN rating WHERE users._id = rating.writer_id ORDER BY rating DESC ${limit ? `LIMIT ${parseInt(limit)} OFFSET ${parseInt(page)}` : ''} `
   
        return db.execute(query, queries)
    }

}