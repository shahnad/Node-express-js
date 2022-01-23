const userModel = require('../Models/userModels');
const bcrypt = require('bcrypt');
const fs = require('fs');
const bookModel = require('../Models/bookModel');
const crypto = require('../crypto/index');
const { log } = require('console');
const user = new userModel()
const moment = require('moment');
const book = new bookModel()
require('dotenv').config()

// GET USER
exports.getUsers = async (req, res, next) => {
    const { page, limit } = req.query;
    let data = {
        users: [],
        total: 0
    }

    await user.getUsers({ page: null, limit: null }).then(([rows]) => {
        data = { ...data, total: rows?.length }

    }).catch((error) => {
        console.error(error)
    })

    await user.getUsers({ page: page || 0, limit: limit || 10 }).then(([rows]) => {
        data = { ...data, users: rows }
        res.status(200).send({ data: data, status: 200, message: 'OK', })
    }).catch((error) => {
        res.status(500).send({ error: error, status: 500 })
    })
}

// UPDATE USER 
exports.updateUser = (req, res, next) => {
    const { email, password, gender } = req.body
    const { userId } = req.query

    if (!userId) {
        res.status(404).send({ message: "User id is required*", status: 404 })
    } else {
        return bcrypt.hash(password, 12).then((hash) => {
            user.findOneById({ id: userId }).then(([data, fieldData]) => {
                if (data?.length) {
                    user.updateUserProfile({ email, password: hash, gender, id: userId }).then(([rows, fieldData]) => {
                        res.status(200).send({
                            data: { email, password: hash, gender }, message: 'User Updated Successfully!', status: 200
                        })
                    }).catch((error) => {
                        res.status(500).send({ error: error })
                    })
                } else {
                    res.status(404).send({ message: "User Not Exist", status: 404 })
                }
            }).catch((error) => {
                res.status(404).send({ error: error?.message, status: 404 })
            })
        }).catch((error) => {
            res.status(500).send({ error: error?.message, status: 500 })
        })
    }
}

// DELETE USER
exports.deleteUser = (req, res, next) => {
    const { userId } = req.query

    if (!userId) {
        res.status(404).send({ message: "User id is required*", status: 404 })
    } else {
        user.findOneById({ id: userId }).then(([rows, fieldData]) => {
            if (rows?.length) {
                user.deleteUser({ id: userId }).then(([resultData, fieldData]) => {
                    const result = { ...rows[0], password: '&^%(^&**()*^)*&%' }
                    fs.unlink(result?.profile_pic, (err) => {
                        if (err) {
                            throw err
                        }
                    })
                    res.status(200).send({
                        data: result,
                        message: 'User Deleted Successfully!',
                        status: 200
                    })
                }).catch((error) => {
                    res.status(500).send({ error: error })
                })
            } else {
                res.status(404).send({ message: "User Not Exist", status: 404 })
            }
        }).catch((error) => {
            res.status(500).send({ error: error, status: 500 })
        })
    }
}

// FOLLOW USER
exports.followUser = (req, res, next) => {
    const { follower_id, followed_id } = req.body
    user.followUser({ follower_id, followed_id }).then(([resultData, fieldData]) => {
        res.status(200).send({
            message: 'OK',
            status: 200,
            followed_id: resultData?.insertId,
        })
    }).catch((error) => {
        res.status(404).send({ message: error?.message, status: 404, error })
    })
}

exports.getUserFollowings = async (req, res, next) => {
    const { user_id, limit, page } = req.query
    let data = {}

    await user.getUserFollowedIds({ user_id, limit: limit || 10, page: limit * page || 0 }).then(([followedData, fieldData]) => {
        data = { ...data, data: followedData || [], total: followedData?.length ? followedData[0]['total'] : 0 }
        res.status(200).send({
            message: 'OK',
            status: 200,
            data
        })
    }).catch((error) => res.status(404).send({ message: error?.message, status: 404, error }))
}


exports.getUserFollowers = async (req, res, next) => {
    const { user_id, limit, page } = req.query
    let data = {}

    await user.getUserFollowers({ user_id, limit: limit || 10, page: limit * page || 0 }).then(([followers, fieldData]) => {
        data = { ...data, data: followers || [], total: followers?.length ? followers[0]['total'] : 0 }
        res.status(200).send({
            message: 'OK',
            status: 200,
            data
        })
    }).catch((error) => res.status(404).send({ message: error?.message, status: 404, }))
}

exports.getuserWritings = async (req, res, next) => {
    const { user_id, limit, page } = req.query
    let data = {}


    await book.getUserWrirings({ user_id, limit: limit || 10, page: limit * page || 0 })
        .then(([books, fieldData]) => {
            let newArray = [...books]
            newArray = newArray?.length && newArray.map((book) => {
                return {
                    ...book,
                    rating: book?.rating < 3 || book.rating === null ? 3 : book?.rating,
                    created: moment(book?.created).format('L'),
                }
            })
            data = { ...data, data: newArray || [], total: books?.length ? books[0]['total'] : 0 }
            res.status(200).send({
                message: 'OK',
                status: 200,
                data
            })
        }).catch((error) => res.status(404).send({ message: error?.message, status: 404, }))
}

exports.getUserDrafts = async (req, res, next) => {
    const { user_id, limit, page } = req.query
    let data = {}

    await book.getUserDrafts({ user_id, limit: limit || 10, page: limit * page || 0 }).then(([drafts, fieldData]) => {
        data = { ...data, data: drafts || [], total: drafts?.length ? drafts[0]['total'] : 0 }
        res.status(200).send({
            message: 'OK',
            status: 200,
            data
        })
    }).catch((error) => res.status(404).send({ message: error?.message, status: 404, error }))
}

exports.getuserFavoriteBooks = async (req, res, next) => {
    const { user_id, limit, page } = req.query
    let data = {}

    await book.FavoriteBooks({ user_id, limit: limit || 10, page: limit * page || 0 }).then(([favoriteBooks, fieldData]) => {
        data = { ...data, data: favoriteBooks || [], total: favoriteBooks?.length ? favoriteBooks[0]['total'] : 0 }
        res.status(200).send({
            message: 'OK',
            status: 200,
            data
        })
    }).catch((error) => res.status(404).send({ message: error?.message, status: 404, error }))
}

exports.getuserLibrary = async (req, res, next) => {
    const { user_id, limit, page } = req.query
    let data = {}
    await book.getuserLibrary({ user_id, limit: limit || 10, page: limit * page || 0 }).then(([library, fieldData]) => {
        data = { ...data, data: library || [], total: library?.length ? library[0]['total'] : 0 }
        res.status(200).send({
            message: 'OK',
            status: 200,
            data
        })
    }).catch((error) => res.status(404).send({ message: error?.message, status: 404, }))
}


exports.getUserProfile = async (req, res, next) => {
    let { user_id } = req.query
    let data = {}

    await user.getUserData({ user_id }).then(async ([resultData, fieldData]) => {
        if (resultData?.length) {
            delete resultData[0]['password']
            data = {
                ...resultData[0],
                joined: moment(resultData[0]['joined']).format("L")
            }
        }
        res.status(200).send({
            message: 'OK',
            status: 200,
            data
        })

    }).catch((error) => {
        console.log(error);
        res.status(404).send({ message: error?.message, status: 404, error })
    })

}

exports.getWriterProfile = async (req, res, next) => {
    let { user_id } = req.query

    await user.getUserData({ user_id }).then(async ([resultData, fieldData]) => {
        let data = {}
        delete resultData[0]['password']
        let categories = []

        data = {
            ...resultData[0],
            categories: categories,
            rating: resultData[0]?.rating < 3 ||
                resultData[0]?.rating === null ? 3 : resultData[0]?.rating
        }

        await book.getBooksByCategoryUserId({ user_id }).then(([books, fieldData]) => {
            books?.length && books?.map((e => {
                if (e) {
                    e.category.split(',').map((item) => {
                        categories.push(item)
                    })
                }
            }))

        }).catch((error) => {
            res.status(404).send({ message: error?.message, status: 404, error })
        })
        if (categories?.length) {
            await book.getCategories({ category: [...new Set(categories)] })
                .then(([rows, fieldData]) => {
                    data = {
                        ...resultData[0],
                        categories: rows || [],
                        rating: resultData[0]?.rating < 3 ||
                            resultData[0]?.rating === null ? 3 : resultData[0]?.rating
                    }
                }).catch((error) => {
                    res.status(404).send({ message: error?.message, status: 404, error })
                })
        }

        res.status(200).send({
            message: 'OK',
            status: 200,
            data
        })

    }).catch((error) => {
        res.status(404).send({ message: error?.message, status: 404, error })
    })

}


exports.visitProfile = async (req, res, next) => {
    const { user_id, visitors_id } = req.body
    user.userVistiProfile({ user_id, visitors_id }).then(([followersData, fieldData]) => {
        res.status(200).send({
            message: 'OK',
            status: 200,

        })
    }).catch((error) => {
        console.log(error)
        res.status(404).send({ message: error?.message, status: 404, error })
    })
}

exports.getUserByIds = async (req, res, next) => {
    const userIds = req.body
    let data = {}
    user.getUsersByIds({ userIds }).then(([users, fieldData]) => {
        data = { ...data, users }
        res.status(200).send({
            message: 'OK',
            status: 200,
            data
        })
    }).catch((error) => {
        console.log(error)
        res.status(404).send({ message: error?.message, status: 404, error, data })
    })
}

exports.getPremiumWriters = async (req, res, next) => {
    const { limit, page } = req.query
    let data = { total: 0 }
    const user_type = 2

    await user.WritersByID({ user_type, limit: limit || 10, page: limit * page || 0 }).then(([writers, fieldData]) => {
        data = { ...data, data: writers || [], total: writers?.length ? writers[0]['total'] : 0 }
        res.status(200).send({
            message: 'OK',
            status: 200,
            statusText: 'OK',
            data
        })
    }).catch((error) => {
        console.log(error)
        res.status(404).send({ message: error?.message, status: 404 })
    })

}

exports.getFounderWriters = async (req, res, next) => {
    const { limit, page } = req.query
    let data = { total: 0 }
    const user_type = 3

    await user.WritersByID({ user_type, limit: limit || 10, page: page || 0 }).then(([writers, fieldData]) => {
        data = { ...data, data: writers || [], total: writers?.length ? writers[0]['total'] : 0 }
        res.status(200).send({
            message: 'OK',
            status: 200,
            data
        })
    }).catch((error) => {
        console.log(error)
        res.status(404).send({ message: error?.message, status: 404, error })
    })

}

exports.getTopWriters = async (req, res, next) => {
    const { limit, page } = req.query
    let data = { data: [], total: 0 }

    await user.getTopWriters({ limit: limit || 10, page: limit * page || 0 }).then(([writers, fieldData]) => {
        let newArray = [...writers]
        newArray = newArray?.length && newArray?.map((e) => {
            ({
                ...e,
                rating: e?.rating < 3 || e.rating === null ? 3 : e?.rating,
            })
        })

        data = { ...data, data: newArray, total: writers?.length ? writers[0]['total'] : 0 }
        res.status(200).send({
            message: 'OK',
            status: 200,
            data
        })
    }).catch((error) => {
        console.log(error)
        res.status(404).send({ message: error?.message, status: 404, error })
    })

}

exports.getBookCategories = async (req, res, next) => {
    let data = {}
    await user.getBookCategories().then(([categories, fieldData]) => {
        data = { ...data, data: categories, statusText: 'Ok', status: 200, message: 'Categories fetched successfully!', }
        res.status(200).send({ data })
    }).catch((error) => {
        console.error(error)
        data = { ...data, message: error?.message, status: 404, error }
        res.status(404).send({ data })
    })
}

exports.getBookTypes = async (req, res, next) => {
    let data = {}
    await user.getBookTypes().then(([categories, fieldData]) => {
        data = { ...data, data: categories, statusText: 'Ok', status: 200, message: 'Categories fetched successfully!', }
        res.status(200).send({ data })
    }).catch((error) => {
        console.error(error)
        data = { ...data, message: error?.message, status: 404, error }
        res.status(404).send({ data })
    })
}


exports.starWriters = async (req, res, next) => {
    const { limit, page } = req.query

    let data = {}
    await user.getWriters({ limit: limit || 10, page: limit * page || 0 })
        .then(async ([users, fieldData]) => {
            data = {
                ...data, data: users,
                total: users?.length ? users[0]['total'] : 0,
                statusText: 'Ok', status: 200,
                message: 'users fetched successfully!',
            }

            let newArray = []
            for (let index = 0; index < users.length; index++) {
                const id = users[index].id;
                let checkData = await user.getUserDataBooksbyId({ id }).then(([data, err]) => {
                    newArray.push({ ...users[index], bookList: data || [] })
                }).catch((error) => {
                    console.log(error, "wwwwwwwwwwww")
                    res.status(404).send({ message: error?.message, })
                })
            }
            res.status(200).send({ ...data, data: newArray })
        }).catch((error) => {
            console.log(error, "iiiiiiiiiiiiio")
            data = { ...data, message: error?.message, status: 404, error }
            res.status(404).send({ data })
        })





}


exports.getUserBooksById = async (req, res, next) => {
    const { limit, page, id } = req.query
    let data = {}
    await user.getUserBooksById({ limit: limit || 10, page: limit * page || 0, id }).then(([rows, fieldData]) => {
        data = {
            ...data, data: rows || [], total: rows?.length ? rows[0]['total'] : 0,
            statusText: 'Ok', status: 200, message: 'Categories fetched successfully!',
        }
        res.status(200).send({ data })
    }).catch((error) => {
        console.error(error, "ooooooooooooooooooooooooooooooo")
        data = { ...data, message: error?.message, status: 404, error }
        res.status(404).send({ data })
    })
}
