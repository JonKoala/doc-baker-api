const bodyParser = require('body-parser')
const config = require('config')
const cors = require('cors')
const express = require('express')


var app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/projetos', require('./routes/projetos'))

app.use(require('./utils/CustomErrorHandler'))

module.exports = app.listen(config.get('server.port'))
