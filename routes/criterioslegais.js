const mongoose = require('mongoose')
const router = require('express').Router()


const RequisitoAdmissibilidade = mongoose.model('RequisitoAdmissibilidade')

router.get('/admissibilidade', async (req, res) => {
  var requisitosAdmissibilidade = await RequisitoAdmissibilidade.find().lean()
  res.json(requisitosAdmissibilidade)
})

module.exports = router
