require('dotenv').config()

// mongodb+srv://dbuser02:dbuser02@cluster0-z4eg1.gcp.mongodb.net/codecamp?retryWrites=true&w=majority

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  DOMAIN: process.env.DOMAIN,
  JWT_SECRET: process.env.JWT_SECRET,
}
