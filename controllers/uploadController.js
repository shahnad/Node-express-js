


exports.uploadProfilePic = (req, res, next) => {
    res.status(200).send({ file: req.file })
}