require('express-async-errors')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use('/auditores', require('./routes/auditores'))
// app.use('/bakery', require('./routes/bakery'))
// app.use('/criterioslegais', require('./routes/criterioslegais'))
// app.use('/processos', require('./routes/processos'))

app.use(require('./utils/CustomErrorHandler'))

module.exports = app.listen(process.env['DOCBAKER_API_PORT'], () => console.log(`Server up and running! Listening on ${process.env['DOCBAKER_API_PORT']}...`))
