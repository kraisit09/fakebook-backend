const mongoose = require('mongoose')
const config = require('./index')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB
