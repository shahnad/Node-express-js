const authModel = require('../Models/authModel');
const userModel = require('../Models/userModels')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
                        res.status(404).send({ error: 'Invalid Password' })
                    }
                }).catch((error) => {
                    res.status(404).send({ error: error, status: 404 })
                })
        } else {
            res.status(404).send({ error: 'User Not Exist', status: 404 })
        }
    }).catch((error) =>
        res.status(500).send({ error: error, status: 500 })
    )

}

// signup
exports.signUp = (req, res, next) => {
    const { email, password, username } = req.body
    const imageFile = req.file || {}
    const imagePath = imageFile?.filename ? `/images/${imageFile?.filename}` : ''
    auth.findOne({ email: email }).then(([rows, fieldData]) => {
        if (rows.length) {
            res.status(404).send({ data: [], message: "Email is already exist. Please Try with another email" })
        } else {
            return bcrypt.hash(password, 12).then((hash) => {
                user.userSignUp({ email, password: hash, profile_pic: imagePath, username }).then(([resAray, fieldResData]) => {
                  const token = jwt.sign({ email }, 'my_secret_key', { expiresIn: '9h' })
                  req.session.isLoggedIn = true
                  req.session.userData = { email, password, username }
                    res.status(200).send({
                        message: 'User Created Successfully !', data: { email, username, password: hash, profile_pic: imagePath,token }, status: 200
                    })
                }).catch((error) => {
                    res.status(500).send({ error: error, status: 500 })
                })
            }).catch((error) => {
                res.status(404).send({ error: error, status: 404 })
            })
        }
    }).catch((error) => {
        res.status(500).send({ error: error, status: 500 })
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