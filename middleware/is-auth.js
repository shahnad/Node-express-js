const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (authorization) {
        const token = authorization?.split(' ')
        jwt.verify(token[1], 'my_secret_key', function (err, decoded) {
            if (err) {
                res.status(401).send({ error: err })
            } else {
                next()
            }
        })
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
}