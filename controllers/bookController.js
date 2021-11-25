
const e = require("express");
const bookModel = require("../Models/bookModel");
const book = new bookModel()

exports.createBook = (req, res, next) => {
    const { title, imageurl, category, type, userid } = req.body

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
    const time = Math.floor(content?.length / 0.1)
    const duration = time / 60 / 60

    book.addNewEpisode({ episode_no, book_id, content, duration }).then(([rows], fieldData) => {
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
    let data = {}
    await book.getEpisodeByBook({ bookId, limit: limit || 10, offset: offset || 1 }).then(([rows], fieldData) => {
        const encryptContent = rows?.length > 0 && rows?.map((item, i) => ({
            ...item,
            content: item.content?.split(' '),
        }))
        data = { ...data, episodes: encryptContent }
        if (!res.headersSent)
            res.status(200).send({
                message: 'Episodes fetch successfully',
                data: data || {},
                status: 200
            })

    }).catch((error) => {
        console.log(error);
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
    let data = {}
    await book.getViewsData({ book_id, episode_id, user_id }).then(async ([rows], fieldData) => {
        data = { ...rows[0] }
        if (data?.views === null) {
            data = { ...rows[0], views: 1 }
        } else {
            data = { ...rows[0], views: parseInt(data?.views + 1) }
        }

        await book.UpdateEpisodeView({ views: data.views, id: data.id }).then(([resultData], fieldData) => {
        }).catch((error) => console.log(error))

        res.status(200).send({
            message: 'Readed Data Inserted successfully',
            status: 200
        })
    }).catch((error) => {
        res.status(404).send({
            message: "Something went wrong",
            data: error
        })
    })

}

exports.addToFavorite = async (req, res, next) => {
    const { book_id, user_id } = req.body

    book.addToFavorite({ book_id, user_id }).then(([rows], fieldData) => {
        res.status(200).send({
            message: 'Added to Favorites successfully',
            id: rows?.insertId,
            status: 200
        })

    }).catch((error) => {
        res.status(404).send({
            message: "Something went wrong",
            data: error
        })
    })

}

exports.addToLibrary = async (req, res, next) => {
    const { book_id, user_id } = req.body
    book.addToLibrary({ book_id, user_id }).then(([rows], fieldData) => {
        res.status(200).send({
            message: 'Added to library successfully',
            id: rows?.insertId,
            status: 200
        })

    }).catch((error) => {
        res.status(404).send({
            message: "Something went wrong",
            data: error
        })
    })

}