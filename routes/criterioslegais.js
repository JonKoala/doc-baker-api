const router = require('express').Router()

const dbi = require('../dbi')


router.get('/admissibilidade', async (req, res) => {
  var requisitosAdmissibilidade = await dbi.RequisitoAdmissibilidade.find().lean()
  res.json(requisitosAdmissibilidade)
})

module.exports = router
