const mongoose = require('mongoose')


mongoose.connect(process.env['DOCBAKER_DATABASE_CONNECTIONSTRING'], { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)

module.exports = {
  Auditor: require('./Auditor'),
  Processo: require('./Processo'),
  RequisitoAdmissibilidade: require('./RequisitoAdmissibilidade')
}
