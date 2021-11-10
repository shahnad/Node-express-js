const userModel = require('../Models/userModels');
const bcrypt = require('bcrypt');
const fs = require('fs');


const user = new userModel()

// GET USER
exports.getUsers = async (req, res, next) => {
    const { page, limit } = req.query;
    let data = {
        users: [],
        total: 0
    }
    await user.getCountOfallUsers().then(([rows]) => {
        data = { ...data, total: rows[0]['COUNT(*)'] }
    }).catch((err) => err)

    user.getUsers({ page: page || '1', limit: limit || 10 }).then(([rows]) => {
        data = { ...data, users: rows }
        res.status(200).send({ data: data, status: 200, message: 'Users Listed Sucessfully' })
    }).catch((error) => {
        res.status(500).send({ error: error, status: 500 })
    })
}


// UPDATE USER 
exports.updateUser = (req, res, next) => {
    const { email, password, gender } = req.body
    const { userId } = req.query

    if (!userId) {
        res.status(404).send({ message: "User id is required*", status: 404 })
    } else {
        return bcrypt.hash(password, 12).then((hash) => {
            user.findOneById({ id: userId }).then(([data, fieldData]) => {
                if (data?.length) {
                    user.updateUserProfile({ email, password: hash, gender, id: userId }).then(([rows, fieldData]) => {
                        res.status(200).send({
                            data: { email, password: hash, gender }, message: 'User Updated Successfully!', status: 200
                        })
                    }).catch((error) => {
                        res.status(500).send({ error: error })
                    })
                } else {
                    res.status(404).send({ message: "User Not Exist", status: 404 })
                }
            }).catch((error) => {
                res.status(404).send({ error: error, status: 404 })
            })
        }).catch((error) => {
            res.status(500).send({ error: error, status: 500 })
        })
    }
}

// DELETE USER
exports.deleteUser = (req, res, next) => {
    const { userId } = req.query

    if (!userId) {
        res.status(404).send({ message: "User id is required*", status: 404 })
    } else {
        user.findOneById({ id: userId }).then(([rows, fieldData]) => {
            if (rows?.length) {
                user.deleteUser({ id: userId }).then(([resultData, fieldData]) => {
                    const result = { ...rows[0], password: '&^%(^&**()*^)*&%' }
                    fs.unlink(result?.profile_pic, (err) => {
                        if (err) {
                            throw err
                        }
                    })
                    res.status(200).send({
                        data: result, message: 'User Deleted Successfully!',
                        status: 200
                    })
                }).catch((error) => {
                    res.status(500).send({ error: error })
                })
            } else {
                res.status(404).send({ message: "User Not Exist", status: 404 })
            }
        }).catch((error) => {
            res.status(500).send({ error: error, status: 500 })
        })
    }
}

