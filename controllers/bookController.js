
exports.createBook = (req, res, next) => {

    const { title, content } = req.body
    console.log(req.body);

    res.status(200).send({
        message: 'Test',
        data:{}
    })
}