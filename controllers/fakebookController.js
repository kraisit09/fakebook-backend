const _baseCore = require('../utils/baseCore')
const CLT_Fakebook = require('../models/fakebookModel')

async function getFeed(req, res, next) {
  const { userId } = req.body
  let TestuserId = '5f17e0500d338f1e441c3bb8'
  let arrFeed = []

  // Get owner post
  let objUser = await CLT_Fakebook.findOne({ _id: TestuserId })
  if (objUser.Posts.length > 0) {
    objUser.Posts.map((s) => arrFeed.push(s))
  }

  // Get friend post
  let lsFriendId = objUser.FriendList.filter((s) => s.Status === 'friend').map((s) => s.UserId)
  for (const id of lsFriendId) {
    let objFriend = await CLT_Fakebook.findOne({ _id: id })

    if (objFriend.Posts.length > 0) {
      objFriend.Posts.map((s) => arrFeed.push(s))
    }
  }

  _baseCore.resMsg(res, 200, 'success', 'Load feed data success!', { postList: arrFeed })
}

async function createPost(req, res, next) {
  const { userId, content, images } = req.body

  console.log(req)

  const currDate = new Date()

  // Get CurrDataUser
  let objUser = await CLT_Fakebook.findOne({ _id: userId })
  if (!objUser) {
    _baseCore.resMsg(res, 400, 'fail', 'Is not user', {})
    return
  }

  // Insert Post To DataUser
  let currItem = {
    Content: content,
    Images: images,
    CreatedDate: currDate,
    CommentList: [],
  }
  objUser.Posts.push(currItem)
  objUser.save()

  _baseCore.resMsg(res, 200, 'success', 'Create post success!', currItem)
}

module.exports = { getFeed, createPost }
