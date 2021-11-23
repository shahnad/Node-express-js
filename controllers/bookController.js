const bookModel = require("../Models/bookModel");
const book = new bookModel()

exports.createBook = (req, res, next) => {
    const { title, imageurl, category, type, userid } = req.body
    console.log(category, "categorycategory");

    book.createNewBook({ title, imageurl, category, type, userid }).then(([rows], fieldData) => {
        res.status(200).send({
            message: 'Book created successfully',
            data: {
                bookId: rows?.insertId,
                title, imageurl, category, type,
                userid
            }
        })
    }).catch((error) => {
        res.status(404).send({
            message: "Something went wrong",
            data: error
        })
    })
}


exports.addEpisode = (req, res, next) => {
    const { episode_no, book_id, content } = req.body
    book.addNewEpisode({ episode_no, book_id, content }).then(([rows], fieldData) => {
        res.status(200).send({
            message: 'Book created successfully',
            data: {
                episode_no,
                book_id,
                content: content?.split(' '),
                episodeId: rows?.insertId,
            }
        })
    }).catch((error) => {
        res.status(404).send({
            message: "Something went wrong",
            data: error
        })
    })
}

exports.rateEpisode = (req, res, next) => {
    const { book_id, rate, rated_user_id, episode_id } = req.body
    book.rateMyEpisode({ book_id, rate, rated_user_id, episode_id }).then(([rows], fieldData) => {
        res.status(200).send({
            message: 'Rated book successfully',
            book_id, rate, rated_user_id, episode_id,
            ratedId: rows?.insertId,
        })
    }).catch((error) => {
        res.status(404).send({
            message: "Something went wrong",
            data: error
        })

    })

}