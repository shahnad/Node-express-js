const userModel = require('../Models/userModels');
const bcrypt = require('bcrypt');
const fs = require('fs');
const bookModel = require('../Models/bookModel');
const crypto = require('../crypto/index')
const user = new userModel()

const book = new bookModel()

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
        res.status(200).send({ data: data, status: 200, message: 'Users Listed Sucessfully' })
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
                res.status(404).send({ error: error, status: 404 })
            })
        }).catch((error) => {
            res.status(500).send({ error: error, status: 500 })
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
                        data: result, message: 'User Deleted Successfully!',
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
            message: 'You followed him successfully!',
            status: 200,
            followed_id: resultData?.insertId,
        })
    }).catch((error) => {
        res.status(404).send({ message: "User Not Exist", status: 404, error })
    })
}

exports.getUserFollowings = async (req, res, next) => {
    const { user_id, limit, page } = req.query
    let data = {}
  
    await user.getUserFollowedIds({ user_id, limit: limit || 10, page:limit * page || 0 }).then(([followedData, fieldData]) => {
        data = { ...data, data: followedData || [], total: followedData?.length ? followedData[0]['total'] : 0  }
        res.status(200).send({
            message: 'User Followings fetched successfully!',
            status: 200,
            data
        })
    }).catch((error) => res.status(404).send({ message: "User Not Exist", status: 404, error }))
}


exports.getUserFollowers = async (req, res, next) => {
    const { user_id, limit, page } = req.query
    let data = {}

    await user.getUserFollowers({ user_id, limit: limit || 10, page: limit * page || 0 }).then(([followers, fieldData]) => {
        data = { ...data, data: followers || [] , total: followers?.length ? followers[0]['total'] : 0 }
        res.status(200).send({
            message: 'User followers fetched successfully!',
            status: 200,
            data
        })
    }).catch((error) => res.status(404).send({ message: "User Not Exist", status: 404, error }))
}

exports.getuserWritings = async (req, res, next) => {
    const { user_id, limit, page } = req.query
    let data = {}


    await book.getUserWrirings({ user_id, limit: limit || 10, page: limit * page || 0 }).then(([books, fieldData]) => {
        data = { ...data, data: books || [], total: books?.length ? books[0]['total'] : 0 }
        res.status(200).send({
            message: 'User writings fetched successfully!',
            status: 200,
            data
        })
    }).catch((error) => res.status(404).send({ message: "User Not Exist", status: 404, error }))
}

exports.getUserDrafts = async (req, res, next) => {
    const { user_id, limit, page } = req.query
    let data = {}
   
    await book.getUserDrafts({ user_id, limit: limit || 10, page: limit * page || 0 }).then(([drafts, fieldData]) => {
        data = { ...data, data: drafts || [], total: drafts?.length ? drafts[0]['total'] : 0 }
        res.status(200).send({
            message: 'Drafts fetched successfully!',
            status: 200,
            data
        })
    }).catch((error) => res.status(404).send({ message: "User Not Exist", status: 404, error }))
}

exports.getuserFavoriteBooks = async (req, res, next) => {
    const { user_id, limit, page } = req.query
    let data = {}

    await book.FavoriteBooks({ user_id, limit: limit || 10, page: limit * page || 0 }).then(([favoriteBooks, fieldData]) => {
        data = { ...data, data: favoriteBooks || [], total: favoriteBooks?.length ? favoriteBooks[0]['total'] : 0 }
        res.status(200).send({
            message: 'favorite books fetched successfully!',
            status: 200,
            data
        })
    }).catch((error) => res.status(404).send({ message: "User Not Exist", status: 404, error }))
}

exports.getuserLibrary = async (req, res, next) => {
    const { user_id, limit, page } = req.query
    let data = {}
    await book.getuserLibrary({ user_id, limit: limit || 10, page: limit * page || 0 }).then(([library, fieldData]) => {
        data = { ...data, data: library || [], total: library?.length ? library[0]['total'] : 0 }
        res.status(200).send({
            message: 'library books fetched successfully!',
            status: 200,
            data
        })
    }).catch((error) => res.status(404).send({ message: error, status: 404, }))
}


exports.getUserProfile = async (req, res, next) => {
    let { user_id } = req.query


    await user.getUserData({ user_id }).then(async ([resultData, fieldData]) => {
        delete resultData[0]['password']
        let data = {
            ...resultData[0],
        }

        const bookIds = data?.books?.map(e => e?.id?.toString()).filter(e => e)

        bookIds?.length > 0 && await user.getUserRatings({ bookIds }).then(([rating, fieldData]) => {
            const resultData = rating?.map((result) => (result?.rate)) || []
            const sum = resultData.reduce((a, b) => a + b, 0) || 0
            data = { ...data, rating: Math.floor(sum / resultData?.length) || 0 }
        }).catch((error) => console.log(error))

        await user.profileVisited({ user_id }).then(([profile, fieldData]) => {
            if (profile?.length) {
                data = { ...data, visitedCount: profile[0]['COUNT(id)'] }
            }
        }).catch((error) => console.log(error))

        res.status(200).send({
            message: 'User profile fetched successfully!',
            status: 200,
            data
        })

    }).catch((error) => {
        console.log(error);
        res.status(404).send({ message: "User Not Exist", status: 404, error })
    })

}

exports.getWriterProfile = async (req, res, next) => {
    let { user_id } = req.query


    await user.getUserData({ user_id }).then(async ([resultData, fieldData]) => {
        delete resultData[0]['password']
        let data = {
            ...resultData[0],
        }

        const bookIds = data?.books?.map(e => e?.id?.toString()).filter(e => e)

        bookIds?.length > 0 && await user.getUserRatings({ bookIds }).then(([rating, fieldData]) => {
            const resultData = rating?.map((result) => (result?.rate)) || []
            const sum = resultData.reduce((a, b) => a + b, 0) || 0
            data = { ...data, rating: Math.floor(sum / resultData?.length) || 0 }
        }).catch((error) => console.log(error))

        await user.profileVisited({ user_id }).then(([profile, fieldData]) => {
            if (profile?.length) {
                data = { ...data, visitedCount: profile[0]['COUNT(id)'] }
            }
        }).catch((error) => console.log(error))

        res.status(200).send({
            message: 'User profile fetched successfully!',
            status: 200,
            data
        })

    }).catch((error) => {
        console.log(error);
        res.status(404).send({ message: "User Not Exist", status: 404, error })
    })

}
// 

exports.visitProfile = async (req, res, next) => {
    const { user_id, visitors_id } = req.body
    user.userVistiProfile({ user_id, visitors_id }).then(([followersData, fieldData]) => {
        res.status(200).send({
            message: 'User profile visited successfully!',
            status: 200,

        })
    }).catch((error) => {
        console.log(error)
        res.status(404).send({ message: "User Not Exist", status: 404, error })
    })
}

exports.getUserByIds = async (req, res, next) => {
    const userIds = req.body
    let data = {}
    user.getUsersByIds({ userIds }).then(([users, fieldData]) => {
        data = { ...data, users }
        res.status(200).send({
            message: 'Users fetched successfully!',
            status: 200,
            data
        })
    }).catch((error) => {
        console.log(error)
        res.status(404).send({ message: "User Not Exist", status: 404, error, data })
    })
}

exports.getPremiumWriters = async (req, res, next) => {
    const { limit, page } = req.query
    let data = { total: 0 }
    const user_type = 2

    await user.WritersByID({ user_type, limit: limit || 10, page: page || 0 }).then(([writers, fieldData]) => {
        data = { ...data, data: writers || [] }
        res.status(200).send({
            message: 'Premium writers fetched successfully!',
            status: 200,
            statusText: 'OK',
            data
        })
    }).catch((error) => {
        console.log(error)
        res.status(404).send({ message: error, status: 404 })
    })

}

exports.getFounderWriters = async (req, res, next) => {
    const { limit, page } = req.query
    let data = { total: 0 }
    const user_type = 3

    await user.WritersByID({ user_type, limit: limit || 10, page: page || 0 }).then(([writers, fieldData]) => {
        data = { ...data, data: writers || [], total: writers?.length ? writers[0]['total'] : 0 }
        res.status(200).send({
            message: 'Founder writers fetched successfully!',
            status: 200,
            data
        })
    }).catch((error) => {
        console.log(error)
        res.status(404).send({ message: "User Not Exist", status: 404, error })
    })

}

exports.getTopWriters = async (req, res, next) => {
    const { limit, page } = req.query
    let data = { writers: [], total: 0 }

    await user.getTopWriters({ limit: limit || 10, page: page || 0 }).then(([writers, fieldData]) => {
        data = { ...data, data: writers, total: writers?.length ? writers[0]['total'] : 0 }
        res.status(200).send({
            message: 'Founder writers fetched successfully!',
            status: 200,
            data
        })
    }).catch((error) => {
        console.log(error)
        res.status(404).send({ message: "User Not Exist", status: 404, error })
    })

}

exports.getBookCategories = async (req, res, next) => {
    let data = {}
    await user.getBookCategories().then(([categories, fieldData]) => {
        data = { ...data, data: categories, statusText: 'Ok', status: 200, message: 'Categories fetched successfully!', }
        res.status(200).send({ data })
    }).catch((error) => {
        console.error(error)
        data = { ...data, message: "Something went wrong", status: 404, error }
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
        data = { ...data, message: "Something went wrong", status: 404, error }
        res.status(404).send({ data })
    })
}
//