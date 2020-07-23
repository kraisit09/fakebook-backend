const jwt = require('jsonwebtoken')
const config = require('../config/index')
const CLT_Fakebook = require('../models/fakebookModel')
const _baseCore = require('../utils/baseCore')

async function registerUser(req, res, next) {
  try {
    const { username, password, fullname } = req.body

    // Check IsFound Username
    const existUsername = await CLT_Fakebook.findOne({ Username: username })
    if (existUsername) {
      _baseCore.resMsg(res, 400, 'fail', 'Username already exits', {})
      return
    }

    // Add ObjUser
    let objUser = new CLT_Fakebook()
    objUser.Username = username
    objUser.Password = await objUser.encryptPassword(password)
    objUser.FullName = fullname
    objUser.ImageProfile = ''
    objUser.FriendList = []
    objUser.Posts = []
    await objUser.save()

    _baseCore.resMsg(res, 201, 'success', 'signup success!', { FullName: fullname })
  } catch (err) {
    next(err)
  }
}

async function loginUser(req, res, next) {
  try {
    const { username, password } = req.body

    // Check username, password
    const currUser = await CLT_Fakebook.findOne({ Username: username })
    const isMatch = await currUser.comparePassword(password, currUser)
    if (!currUser || !isMatch) {
      _baseCore.resMsg(res, 400, 'fail', 'username or password not match', {})
      return
    }

    // Create token
    const token = await jwt.sign(
      {
        id: currUser.username,
      },
      config.JWT_SECRET,
      { expiresIn: '10 days' }
    )

    // Decode expiration date
    const expires_in = jwt.decode(token)

    _baseCore.resMsg(res, 200, 'success', 'login success!', {
      userId: currUser._id,
      fullName: currUser.FullName,
      token: token,
      expires_in: expires_in.exp,
    })
  } catch (error) {
    next(error)
  }
}

async function changePassword(req, res, next) {
  try {
    const { userId, oldPassword, newPassword } = req.body

    // Get User
    let currUser = await CLT_Fakebook.findOne({ _id: userId })

    // Check OldPassword
    const isMatch = await currUser.comparePassword(oldPassword)
    if (!isMatch) {
      _baseCore.resMsg(res, 400, 'fail', 'Incorrect old password', {})
      return
    }

    // Change New Password
    currUser.Password = await currUser.encryptPassword(newPassword)
    await currUser.save()

    _baseCore.resMsg(res, 200, 'success', 'Change password success!')
  } catch (error) {
    next(error)
  }
}

module.exports = { registerUser, loginUser, changePassword }
