
const e = require("express");
const bookModel = require("../Models/bookModel");
const book = new bookModel()
const { uploadFile } = require('../s3_config')
const fs = require('fs');
require('dotenv').config()
const util = require('util');
const moment = require('moment')
const unlinkFile = util.promisify(fs.unlink)
const base_url = process.env.BASE_URL

exports.createBook = async (req, res, next) => {
    const { title, category, type, userid } = req.body
    const imageFile = req.files[0] || {}

    let result = {}
    let imagePath = "";

    if (imageFile?.filename) {
        result = await uploadFile(imageFile)
        await unlinkFile(imageFile.path)
        imagePath = `${base_url}/images/${result?.key}`
    }
   
    await book.createNewBook({ title, imageurl: imagePath, category, type, userid })
        .then(([rows], fieldData) => {
            res.status(200).send({
                message: 'OK',
                data: {
                    bookId: rows?.insertId,
                    title,
                    image: result?.key,
                    category,
                    type,
                    userid,
                    partNumber: 1,
                }
            })
        }).catch((error) => {
            console.log(error);
            res.status(404).send({
                message: error?.message,
            })
        })
}

exports.addEpisode = async (req, res, next) => {

    const { episode_no, book_id, content } = req.body
    const time = Math.floor(content?.length / 0.01)
    const duration = time / 60 / 60

    await book.addNewEpisode({ episode_no, book_id, content, duration })
        .then(([rows], fieldData) => {

            res.status(200).send({
                message: 'OK',
                data: {
                    episode_no,
                    book_id,
                    content: content?.split(' '),
                    episodeId: rows?.insertId,
                }
            })
        }).catch((error) => {
            console.log(error);
            res.status(404).send({
                message: error?.message,
            })
        })
}

exports.rateEpisode = (req, res, next) => {
    const { book_id, rate, rated_user_id, episode_id, writer_id } = req.body
    book.rateMyEpisode({ book_id, rate, rated_user_id, episode_id, writer_id })
        .then(([rows], fieldData) => {
            res.status(200).send({
                message: 'OK',
                book_id, rate, rated_user_id, episode_id,
                ratedId: rows?.insertId,
            })

        }).catch((error) => {
            res.status(404).send({
                message: error?.message,
            })

        })

}

exports.getEpisodeByBook = async (req, res, next) => {
    const { episodeId, } = req.query
    let data = {}

    await book.getEpisodeByBook({ episodeId })
        .then(([rows], fieldData) => {
            let newArray = [...rows]
            // newArray = newArray?.length > 0 && newArray?.map((item, i) => ({
            //     ...item,
            //     content: item.content?.split(' '),
            // }))
            data = { ...data, data: newArray }
            res.status(200).send({
                message: 'OK',
                data: data || {},
                status: 200
            })

        }).catch((error) => {
            console.log(error);
            res.status(404).send({
                message: error?.message,
            })
        })

}

exports.getBooksById = (req, res, next) => {
    const { userId } = req.query
    book.getBooksById({ userId })
        .then(([rows], fieldData) => {
            res.status(200).send({
                message: 'OK',
                data: rows || [],
                status: 200
            })
        }).catch((error) => {
            res.status(404).send({
                message: error?.message,
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

        await book.UpdateEpisodeView({ views: data.views, id: data.id })
            .then(([resultData], fieldData) => {
            }).catch((error) => console.log(error))

        res.status(200).send({
            message: 'OK',
            status: 200
        })
    }).catch((error) => {
        res.status(404).send({
            message: error?.message,
        })
    })

}

exports.addToFavorite = async (req, res, next) => {
    const { book_id, user_id } = req.body

    book.addToFavorite({ book_id, user_id }).then(([rows], fieldData) => {
        res.status(200).send({
            message: 'OK',
            id: rows?.insertId,
            status: 200
        })

    }).catch((error) => {
        res.status(404).send({
            message: error?.message,
        })
    })

}

exports.addToLibrary = async (req, res, next) => {
    const { book_id, user_id } = req.body
    book.addToLibrary({ book_id, user_id }).then(([rows], fieldData) => {
        res.status(200).send({
            message: 'OK',
            id: rows?.insertId,
            status: 200
        })

    }).catch((error) => {
        res.status(404).send({
            message: error?.message,
        })
    })

}

exports.getBooksByIds = async (req, res, next) => {
    const bookIds = req.body
    let data = {}
    book.getBooksByIds({ bookIds }).then(([rows], fieldData) => {
        data = { ...data, books: rows }
        res.status(200).send({
            message: 'OK',
            status: 200,
            data
        })
    }).catch((error) => {
        res.status(404).send({
            message: error?.message,
        })
    })

}

exports.getBooksOftheWeeks = async (req, res, next) => {
    const { limit, page } = req.query
    let data = { data: [], total: 0 }

    await book.getBooksOfWeeks({ limit: limit || 10, page: limit * page || 0 })
        .then(([rows], fieldData) => {
            let newArray = [...rows]
            newArray = newArray?.length && newArray.map((book) => {
                return {
                    ...book,
                    rating: book?.rating < 3 || book.rating === null ? 3 : book?.rating,
                }
            })
            data = { ...data, data: newArray, total: rows?.length ? rows[0]['total'] : 0 }
            res.status(200).send({
                message: 'OK',
                status: 200,
                data
            })
        }).catch((error) => {
            res.status(404).send({
                message: error?.message
            })
        })
}

exports.latestReleases = async (req, res, next) => {
    const { limit, page } = req.query
    let data = { data: [], total: 0 }
    await book.latestReleases({ limit: limit || 10, page: limit * page || 0 })
        .then(([rows], fieldData) => {
            let newArray = [...rows]
            newArray = newArray?.length && newArray.map((book) => {
                return {
                    ...book,
                    rating: book?.rating < 3 || book.rating === null ? 3 : book?.rating,
                }
            })
            data = { ...data, data: newArray, total: rows?.length ? rows[0]['total'] : 0 }
            res.status(200).send({
                message: 'OK',
                status: 200,
                data
            })
        }).catch((error) => {
            res.status(404).send({
                msage: error?.message
            })
        })
}


exports.trendingBooks = async (req, res, next) => {
    const { limit, page } = req.query
    let data = { data: [], }
    await book.trendingBooks({ limit: limit || 10, page: limit * page || 0 })
        .then(([rows], fieldData) => {
            let newArray = [...rows]
            newArray = newArray?.length && newArray.map((book) => {
                return {
                    ...book,
                    rating: book?.rating < 3 || book.rating === null ? 3 : book?.rating,
                }
            })

            data = { ...data, data: newArray, total: rows?.length ? rows[0]['total'] : 0 }
            res.status(200).send({
                message: 'OK',
                status: 200,
                data
            })
        }).catch((error) => {
            res.status(404).send({
                message: error?.message,
            })
        })
}

exports.getEpisodesById = async (req, res, next) => {
    const { limit, page, bookId } = req.query


    let data = { data: [], }
    await book.getEpisodesById({ bookId, limit: limit || 10, page: limit * page || 0 })
        .then(([rows], fieldData) => {
            let newArray = [...rows]
            newArray = newArray?.length && newArray.map((book) => {
                return {
                    ...book,
                    rating: book?.rating < 3 || book.rating === null ? 3 : book?.rating,
                    published: moment(book?.created).format('L'),
                }
            })
            data = { ...data, data: newArray, total: rows?.length ? rows[0]['total'] : 0 }
            res.status(200).send({
                message: 'OK',
                status: 200,
                data
            })
        }).catch((error) => {
            res.status(404).send({
                message: error?.message,
            })
        })
}

exports.getBookDetailsById = async (req, res, next) => {
    const { id } = req.query
    let data = { data: [], }

    await book.getBookDetailsById({ id })
        .then(([rows], fieldData) => {

            let newArray = [...rows]
            newArray = newArray?.length && newArray.map((book) => {
                return {
                    ...book,
                    rating: book?.rating < 3 || book.rating === null ? 3 : book?.rating,
                    created: moment(book?.created).format('L'),
                }
            })
            data = { ...data, data: newArray }
        }).catch((error) => {
            res.status(404).send({
                message: error?.message,
            })
        })
    const category = await data.data?.length && data.data?.map(e => e.categories)

    await book.getCategories({ category })
        .then(([rows], fieldData) => {
            if (rows?.length) {
                const newArray = rows.map(e => e?.categoryName)
                const newmappedData = data.data.map(e => {
                    return { ...e, categories: rows }
                })
                data = { ...data, data: newmappedData }
            }
            res.status(200).send({
                message: 'OK',
                status: 200,
                data
            })

        }).catch((error) => {
            res.status(404).send({
                message: error?.message,
            })
        })




}

exports.newBooks = async (req, res, next) => {
    const { limit, page } = req.query

    await book.getNewBooks({ limit: limit || 10, page: limit * page || 0 })
        .then(([rows], fieldData) => {

            let newArray = [...rows]
            newArray = newArray?.length && newArray.map((book) => {
                return {
                    ...book,
                    rating: book?.rating < 3 || book.rating === null ? 3 : book?.rating,

                }
            })

            res.status(200).send({
                message: 'OK',
                status: 200,
                data: {
                    data: newArray, total: rows?.length ? rows[0]['total'] : 0
                }
            })
        }).catch((error) => {
            res.status(404).send({
                message: error?.message,
            })
        })
}