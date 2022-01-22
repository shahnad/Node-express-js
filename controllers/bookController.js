
const e = require("express");
const { log } = require("npmlog");
const bookModel = require("../Models/bookModel");
const book = new bookModel()

exports.createBook = (req, res, next) => {
    const { title, imageurl, category, type, userid, status } = req.body

    book.createNewBook({ title, imageurl, category, type, userid, status }).then(([rows], fieldData) => {
        res.status(200).send({
            message: 'Book created successfully',
            data: {
                bookId: rows?.insertId,
                title, imageurl, category, type,
                userid
            }
        })
    }).catch((error) => {
        console.log(error);
        res.status(404).send({
            message: error?.message,
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
            message: error?.message,
        })
    })
}

exports.rateEpisode = (req, res, next) => {
    const { book_id, rate, rated_user_id, episode_id, writer_id } = req.body
    book.rateMyEpisode({ book_id, rate, rated_user_id, episode_id, writer_id }).then(([rows], fieldData) => {
        res.status(200).send({
            message: 'Rated book successfully',
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
            message: error?.message,
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

        await book.UpdateEpisodeView({ views: data.views, id: data.id }).then(([resultData], fieldData) => {
        }).catch((error) => console.log(error))

        res.status(200).send({
            message: 'Readed Data Inserted successfully',
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
            message: 'Added to Favorites successfully',
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
            message: 'Added to library successfully',
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
            message: 'Books fetched successfully',
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

    await book.getBooksOfWeeks({ limit: limit || 10, page: limit * page || 0 }).then(([rows], fieldData) => {

        data = { ...data, data: rows, total: rows?.length ? rows[0]['total'] : 0 }
        res.status(200).send({
            message: 'Books of the week fetched successfully',
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
    await book.latestReleases({ limit: limit || 10, page: limit * page || 0 }).then(([rows], fieldData) => {
        data = { ...data, data: rows, total: rows?.length ? rows[0]['total'] : 0 }

        console.log('--------------------------',rows,'------------------------------------------')




        res.status(200).send({
            message: 'Books of the week fetched successfully',
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
    await book.trendingBooks({ limit: limit || 10, page: limit * page || 0 }).then(([rows], fieldData) => {
        data = { ...data, data: rows, total: rows?.length ? rows[0]['total'] : 0 }
        res.status(200).send({
            message: 'Books of the week fetched successfully',
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
    await book.getEpisodesById({ bookId, limit: limit || 10, page: limit * page || 0 }).then(([rows], fieldData) => {
        data = { ...data, data: rows, total: rows?.length ? rows[0]['total'] : 0 }
        res.status(200).send({
            message: 'Books bY id  fetched successfully',
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

    // getCategories

    await book.getBookDetailsById({ id }).then(([rows], fieldData) => {
        data = { ...data, data: rows }
    }).catch((error) => {
        res.status(404).send({
            message: error?.message,
        })
    })
    console.log(req.user, 'aaaaaaaaaaa');


    const category = await data.data?.length && data.data?.map(e => e.categories)

    await book.getCategories({ category }).then(([rows], fieldData) => {
        if (rows?.length) {
            const newArray = rows.map(e => e?.categoryName)
            const newmappedData = data.data.map(e => {
                return { ...e, categories: rows }
            })
            data = { ...data, data: newmappedData }
        }
        res.status(200).send({
            message: 'Books Details fetched successfully',
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

    await book.getNewBooks({ limit: limit || 10, page: limit * page || 0 }).then(([rows], fieldData) => {
        res.status(200).send({
            message: 'Books Details fetched successfully',
            status: 200,
            data: {
                data: rows, total: rows?.length ? rows[0]['total'] : 0
            }
        })
    }).catch((error) => {
        res.status(404).send({
            message: error?.message,
        })
    })



}