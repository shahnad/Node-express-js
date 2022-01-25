
require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const e = require('express');
const fs = require('fs');
const { uploadFile } = require('../s3_config')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const authModel = require('../Models/authModel');
const userModel = require('../Models/userModels')
const base_url = process.env.BASE_URL
const auth = new authModel()
const user = new userModel()



// login post
exports.login = (req, res, next) => {
    const { email, password } = req.body

    auth.findOne({ email }).then(([rows, fieldData]) => {
        if (rows.length) {
            const userData = { ...rows[0] }
            bcrypt.compare(password, userData.password)
                .then((respose) => {
                    if (respose) {
                        const token = jwt.sign({ email }, 'my_secret_key', { expiresIn: '9h' })
                        req.session.isLoggedIn = true
                        req.session.userData = userData
                        res.status(200).send({ data: userData, message: 'Logged In Successfully', status: 200, token });
                    } else {

                        res.status(404).send({ message: 'Invalid Password', status: 404 })
                    }
                }).catch((error) => {
                    console.log(JSON.stringify(error));
                    res.status(404).send({ message: error?.message, status: 404 })
                })
        } else {
            res.status(404).send({ error: "You're trying with a wrong credentials.Please Try again", status: 404 })
        }
    }).catch((error) =>
        res.status(500).send({ message: error?.message, status: 500 })
    )

}

// signup
exports.signUp = async (req, res, next) => {
    const { email, password, username } = req.body
    const imageFile = req.files[0] || {}

    let result = {}
    let imagePath = "";

    if (imageFile?.filename) {
        result = await uploadFile(imageFile)
        await unlinkFile(imageFile.path)
        imagePath = `${base_url}/images/${result?.key}`
    }

    auth.findOne({ email: email })
        .then(([rows, fieldData]) => {
            if (rows.length) {
                res.status(404).send({
                    data: [],
                    message: "Email is already exist. Please Try with another email"
                })
            } else {
                return bcrypt.hash(password, 12)
                    .then((hash) => {
                        user.userSignUp({
                            email,
                            password: hash,
                            profile_pic: imagePath,
                            username
                        })
                            .then(([resAray, fieldResData]) => {
                                const token = jwt.sign({ email }, 'my_secret_key', { expiresIn: '9h' })
                                req.session.isLoggedIn = true
                                req.session.userData = { email, password, username }
                                res.status(200).send({
                                    message: 'user created successfully !', data: {
                                        id: resAray?.insertId,
                                        email,
                                        username,
                                        password: hash,
                                        profile_pic: imagePath,
                                        token
                                    }, status: 200
                                })
                            }).catch((error) => {
                                res.status(404).send({
                                    message: error.message,
                                    status: 404
                                })
                            })
                    }).catch((error) => {
                        res.status(404).send({
                            message: error?.message,
                            status: 404
                        })
                    })
            }
        }).catch((error) => {
            console.log(error);
            res.status(404).send({
                message: error?.message,
                status: 500
            })
        })
}

exports.logout = (req, res, next) => {
    req.session.destroy()
    req.session = null;
    req.logout();
    res.status(200).send({ message: 'Logged Out Successfully !', status: 200 })
}

exports.successLogin = (req, res, next) => {
    res.redirect('/')
    res.status(200).send({ message: 'Logged In Successfully !', status: 200 })
}

exports.successFbLogin = (req, res, next) => {
    res.status(200).send({ message: 'Logged In Successfully !', status: 200 })
}

exports.getSliderImages = (req, res, next) => {
    let data = {}
    auth.getSliderImages().then(([images, fieldResData]) => {
        data = { ...data, images: images }
        res.status(200).send({ message: 'OK', status: 200, data })
    }).catch((error) => {
        res.status(404).send({ message: error?.message, status: 500 })
    })
}

exports.booksandwriters = async (req, res, next) => {
    const { search, limit, page } = req.query
    let data = {}

    await auth.searchBooks({ search, limit: limit || 10, page: limit * page || 0 })
        .then(([result, fieldResData]) => {
            let newArray = [...result]
            newArray = newArray?.length && newArray.map((item) => ({
                ...item,
                rating: item.rating < 3 || item.rating === null ? 3 : item.rating,
            }))
            data = {
                ...data, book: {
                    data: newArray,
                    total: result?.length ? result[0]['total'] : 0
                }
            }

        }).catch((error) => console.error(error))


    await auth.searchWriters({ search, limit: limit || 10, page: limit * page || 0 })
        .then(([result, fieldResData]) => {
            let newArray = [...result]
            newArray = newArray?.length && newArray.map((item) => ({
                ...item,
                rating: item.rating < 3 || item.rating === null ? 3 : item.rating,
            }))
            data = {
                ...data, writer: {
                    data: newArray,
                    total: result?.length ? result[0]['total'] : 0
                }
            }
            res.status(200).send({ message: 'OK', status: 200, data })
        }).catch((error) => {

            res.status(404).send({
                message: error?.message,

            })
        })

}
