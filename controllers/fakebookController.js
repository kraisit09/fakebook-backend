const _baseCore = require('../utils/baseCore')
const CLT_Fakebook = require('../models/fakebookModel')

async function getFeed(req, res, next) {
  let userId = '5f17e0500d338f1e441c3bb8'
  let arrFeed = []

  // Get owner post
  let objUser = await CLT_Fakebook.findOne({ _id: userId })
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

module.exports = { getFeed }
