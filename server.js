require('express-async-errors')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

const customErrorHandler = require('./utils/CustomErrorHandler')
const routes = require('./routes')


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)
app.use(customErrorHandler)

module.exports = app.listen(process.env['DOCBAKER_API_PORT'], () => console.log(`Server up and running! Listening on ${process.env['DOCBAKER_API_PORT']}...`))
