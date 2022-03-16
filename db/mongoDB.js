const mongoose = require('mongoose')
require('dotenv').config()
const MONGODB_LOCALHOST_DATABASE_NAME =
  process.env.MONGODB_DATABASE_NAME || 'digital_aided_school_lms'
const MONGODB_LOCALHOST_CONNECTION_PORT =
  process.env.MONGODB_CONNECTION_PORT || '27017'

const MONGODB_CONNECTION_URI =
  process.env.MONGODB_CONNECTION_URI_ ||
  `mongodb://localhost:${MONGODB_LOCALHOST_CONNECTION_PORT}/${MONGODB_LOCALHOST_DATABASE_NAME}`

mongoose
  .connect(MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log('connected')
  })
  .catch((err) => {
    console.error(
      '==============================================================='
    )
    console.error('DB Not Connected')
    console.error(
      '==============================================================='
    )
  })

module.exports = mongoose
