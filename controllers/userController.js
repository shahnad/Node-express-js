const userModel = require('../Models/userModels');
const bcrypt = require('bcrypt');
const fs = require('fs');
const bookModel = require('../Models/bookModel');


const user = new userModel()

const book = new bookModel()

// GET USER
exports.getUsers = async (req, res, next) => {
    const { page, limit } = req.query;
    let data = {
        users: [],
        total: 0
    }
    await user.getCountOfallUsers().then(([rows]) => {
        data = { ...data, total: rows[0]['COUNT(*)'] }
    }).catch((err) => err)

    user.getUsers({ page: page || '1', limit: limit || 10 }).then(([rows]) => {
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

exports.getUserProfile = async (req, res, next) => {
    const { user_id } = req.query

    await user.getUserData({ user_id }).then(async ([resultData, fieldData]) => {
        delete resultData[0]['password']
        let data = {
            ...resultData[0],
        }
        await user.getUserFollowers({ user_id }).then(([followersData, fieldData]) => {
            const resultData = followersData?.map((result) => (result?.follower_id))
            data = { ...data, followers: resultData || [] }
        }).catch((error) => console.log(error))

        await user.getUserFollowedIds({ user_id }).then(([followedData, fieldData]) => {
            const resultData = followedData?.map((result) => (result?.followed_id))
            data = { ...data, followed: resultData || [] }
        }).catch((error) => console.log(error))

        await book.getUserBooks({ user_id, status: 1 }).then(([books, fieldData]) => {
            const resultData = books?.map((result) => (result.id))
            data = { ...data, books: resultData || [] }
        }).catch((error) => console.log(error))

        await book.getUserBooks({ user_id, status: 0 }).then(([books, fieldData]) => {
            const resultData = books?.map((result) => (result.id))
            data = { ...data, drafts: resultData || [] }
        }).catch((error) => console.log(error))

        const bookIds = data?.books?.map(e => e?.id?.toString()).filter(e => e)

        bookIds?.length > 0 && await user.getUserRatings({ bookIds }).then(([rating, fieldData]) => {
            const resultData = rating?.map((result) => (result?.rate)) || []
            const sum = resultData.reduce((a, b) => a + b, 0) || 0
            data = { ...data, rating: Math.floor(sum / resultData?.length) || 0 }
        }).catch((error) => console.log(error))

        await book.FavoriteBooks({ user_id }).then(([favorites, fieldData]) => {
            const resultData = favorites?.map((result) => (result?.book_id))
            data = { ...data, favoriteBooks: resultData || [] }
        }).catch((error) => console.log(error))

        await book.getMyLibarary({ user_id }).then(([library, fieldData]) => {
            const resultData = library?.map((result) => (result?.book_id))
            data = { ...data, mylibrary: resultData || [] }
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
