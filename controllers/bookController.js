const e = require("express");
const bookModel = require("../Models/bookModel");
const book = new bookModel()

let EpisodeArray = []

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


exports.getEpisodeByBook = async (req, res, next) => {
    const { bookId, limit, offset } = req.query

    book.getEpisodeByBook({ bookId, limit: limit || 10, offset: offset || 1 }).then(([rows], fieldData) => {
        const encryptContent = rows?.length > 0 && rows?.map((item, i) => ({
            ...item,
            content: item.content?.split(' '),
        }))

        res.status(200).send({
            message: 'Episodes fetch successfully',
            data: encryptContent || [],
            status: 200
        })

    }).catch((error) => {
        console.log(error, 'errorerror');
        res.status(404).send({
            message: "Something went wrong",
            data: error
        })
    })

}

exports.getBooksById = (req, res, next) => {
    const { userId } = req.query
    book.getBooksById({ userId }).then(([rows], fieldData) => {
        res.status(200).send({
            message: 'Episodes fetch successfully',
            data: rows || [],
            status: 200
        })
    }).catch((error) => {
        res.status(404).send({
            message: "Something went wrong",
            data: error
        })
    })

}


exports.readBook = async (req, res, next) => {
    const { book_id, episode_id, user_id } = req.body
    const deleteData = await book.deleteSameBook({ book_id, episode_id, user_id })
    book.readBook({ book_id, episode_id, user_id }).then(([rows], fieldData) => {
        res.status(200).send({
            message: 'Readed Data Inserted successfully',
            data: {
                insertedId: rows?.insertId,
                book_id, episode_id, user_id
            },
            status: 200
        })
    }).catch((error) => {
        res.status(404).send({
            message: "Something went wrong",
            data: error
        })
    })
}



