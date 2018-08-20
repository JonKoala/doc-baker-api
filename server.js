const bodyParser = require('body-parser')
const config = require('config')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')


var app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(config.get('database.connection'), { useNewUrlParser: true })
require('./models/Processo')

app.use('/processos', require('./routes/processos'))

app.use(require('./utils/CustomErrorHandler'))

module.exports = app.listen(config.get('server.port'))
