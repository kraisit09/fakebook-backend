const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const fakebookSchema = new Schema(
  {
    Username: { type: String, required: true, trim: true },
    Password: { type: String, required: true, trim: true },
    FullName: { type: String, required: true, trim: true },
    ImageProfile: { type: String },
    FriendList: [
      {
        UserId: { type: String },
        Status: { type: String },
      },
    ],
    Posts: [
      {
        Content: { type: String },
        Images: { type: String },
        CommentList: [
          {
            UserId: { type: String },
            Messages: { type: String },
            CreatedDate: { type: Date },
          },
        ],
        CreatedDate: { type: Date },
      },
    ],
    CreatedDate: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    collection: 'fakebook',
  }
)

fakebookSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  return hashPassword
}

fakebookSchema.methods.comparePassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.Password)
  return isValid
}

const fakebook = mongoose.model('fakebook', fakebookSchema)

module.exports = fakebook
