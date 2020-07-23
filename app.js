const express = require('express')
const app = express()
const config = require('./config/index')
const connectDB = require('./config/db')
const fakebookRoute = require('./routes/fakebookRoute')

const { logHandler } = require('./middleware/logHandler')
const { errorHandler } = require('./middleware/errorHandler')

const cors = require('cors')

connectDB()

// ConfigerService
app.use(logHandler)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// API Route
app.use('/api', fakebookRoute)

app.get('/', (req, res) => res.send('Hello World!'))

app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`Server:[Fakebook-Backend] running in ${process.env.NODE_ENV} mode on port ${config.PORT}`)
})
