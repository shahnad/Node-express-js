
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

    // bio gender id phone userName profilePic coverPic
    updateUserProfile(data) {
        const { bio, phone, gender, id, userName, profilePic, coverPic } = data
        console.log(data,"aaaaaaaaaaaa");
        const query = `UPDATE users SET bio = ?, phone = ?, gender = ?, username = ? ,updated_at = ? ,
        coverPic = ?, profile_pic = ? WHERE _id = ?`
        return db.execute(query, [bio, phone, gender, userName, new Date(), coverPic, profilePic, id])
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
        const query = `SELECT _id as id,
        email,
        username as userName,
        profile_pic as image,
        bio,
        coverPic,
        (SELECT AVG(rate) FROM rating WHERE book_id = ${user_id}) AS rating,
        (SELECT COUNT(follower_id) FROM followers WHERE followers.follower_id = ${user_id}) AS followers,
        (SELECT COUNT(id) FROM books WHERE books.userid = ${user_id}) AS books,
        (SELECT COUNT(id) FROM followers WHERE followers.followed_id = ${user_id}) AS following,
        (SELECT COUNT(id) FROM books WHERE books.userid = ${user_id} AND books.status = 1) AS featuredBooks,
        (SELECT COUNT(id) FROM profilevisitors WHERE profilevisitors.user_id = ${user_id}) AS visitedCount,
        created_at as joined FROM users WHERE _id = ${user_id}`
        return db.execute(query)

    }

    getUserFollowers = (params) => {
        const { user_id, limit, page } = params
        const query = `SELECT followers.follower_id as id,COUNT(id) OVER() as total, users.email, users._id as user_id, users.username, users.profile_pic, users.coverPic FROM followers JOIN users ON users._id =followers.follower_id  WHERE followers.followed_id = ${user_id} ORDER BY followers.id DESC ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
        return db.execute(query)
    }


    getUserFollowedIds = (params) => {
        const { user_id, limit, page } = params
        const query = `SELECT followers.follower_id as id,COUNT(id) OVER() as total,  users.email, users._id as user_id, users.username, users.profile_pic, users.coverPic FROM followers JOIN users ON users._id = followers.followed_id  WHERE followers.follower_id = ${user_id} ORDER BY followers.id DESC ${limit ? `LIMIT ${limit} OFFSET ${page}` : ''}`
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
        let query = `SELECT _id AS id,COUNT(_id) OVER() as total, email, username, profile_pic as image, User_type,
        created_at AS joinedDate  FROM users 
        WHERE User_type = ${user_type}  ${limit ? ` LIMIT ${parseInt(limit)} OFFSET ${parseInt(page)}` : ''}`
        return db.execute(query)
    }

    getTopWriters = ({ limit, page }) => {
        let query = `SELECT _id AS id,
        email,COUNT(_id) OVER() as total,
        username, profile_pic as image,
        (SELECT COUNT(id) FROM followers WHERE followers.follower_id = _id) AS followers,
        (SELECT COUNT(*) FROM books where userid = _id) AS books,
        User_type, created_at AS joinedDate ,
        (SELECT AVG(rate) FROM writerrating where writer_id = _id)
        as rating FROM users ORDER BY rating DESC ${limit ? `LIMIT ${parseInt(limit)} OFFSET ${parseInt(page)}` : ''} `
        return db.execute(query)
    }

    getBookCategories = () => {
        const query = `SELECT _id as id, category FROM bookcategories`;
        return db.execute(query)
    }

    getBookTypes = () => {
        const query = `SELECT id, type FROM booktype`;
        return db.execute(query)
    }

    getWriters = (params) => {
        const { limit, page } = params
        const query = `SELECT _id AS id,
        COUNT(_id) OVER() as total,
        bio,
        username, profile_pic as image
        FROM users
        WHERE starWriters = 1
        ORDER BY _id DESC  ${limit ? `LIMIT ${parseInt(limit)} OFFSET ${parseInt(page)}` : ''}`;
        return db.execute(query)
    }

    getUserDataBooksbyId = (params) => {
        const { id } = params
        const query = `SELECT id, title ,userid from books where userid = (${id})`;
        return db.execute(query)
    }

    getUserBooksById = (params) => {
        const { limit, page, id } = params
        const query = `SELECT id,  COUNT(id) OVER() as total,
        (SELECT AVG(rate) FROM rating WHERE book_id = id) AS rating,
        (SELECT SUM(views) FROM reading WHERE reading.id = ${id}) as views,
        imageurl as image,
        (SELECT SUM(duration) FROM episodes WHERE book_id =id) as duration , 
        created_at as published_on,
        title ,userid from books where userid = (${id}) 
        ${limit ? `LIMIT ${parseInt(limit)} OFFSET ${parseInt(page)}` : ''}`;
        return db.execute(query)

    }


}