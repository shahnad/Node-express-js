


exports.uploadProfilePic = (req, res, next) => {
    console.log("wwwwwwwwwwwwwwwwwwwwww");
    console.log(req.file, "111111111111111111");
    res.status(200).send({ file: req.file })
}