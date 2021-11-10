
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


}