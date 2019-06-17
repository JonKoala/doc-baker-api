const router = require('express').Router()

const CustomError = require('../utils/CustomError')
const dbi = require('../dbi')


router.get('/:template/:processo', async (req, res, next) => {

  res.locals.processo = dbi.Processo.findById(req.params.processo)

  next()
})

router.put('/:template/', async (req, res, next) => {

  var { processo, documento } = req.body

  processo = await dbi.Processo.findById(processo)
  if (!processo)
    throw new CustomError('Processo not found')

  var existingDoc = processo.documentos.find(d => d.template === documento.template)

  res.locals = { processo, documento, existingDoc }

  next()
})

module.exports = router
