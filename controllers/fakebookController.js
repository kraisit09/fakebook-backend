const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/index')
const CLT_Fakebook = require('../models/fakebookModel')

async function registerUser(req, res, next) {
  try {
    const { username, password, fullname } = req.body

    // Validation Req
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Please check data')
      error.statusCode = 422
      error.validation = errors.array()
      throw error
    }

    // Check IsFound Username
    const existUsername = await CLT_Fakebook.findOne({ Username: username })
    if (existUsername) {
      const error = new Error('Username already exits')
      error.statusCode = 400
      throw error
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

    res.status(201).json({
      data: objUser,
      success: true,
    })
  } catch (err) {
    next(err)
  }
}

async function changePassword(req, res, next) {}

async function loginUser(req, res, next) {}

module.exports = { registerUser }
