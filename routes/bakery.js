const router = require('express').Router()

const arrayUtils = require('../utils/ArrayUtils')
const bakery = require('../bakery')
const CustomError = require('../utils/CustomError')
const dbi = require('../dbi')


router.get('/bake', async (req, res) => {

  if (!arrayUtils.containsAll(Object.keys(req.query), ['template', 'processo']))
    throw new CustomError('Missing obrigatory parameters')

  var [doc, processo] = await Promise.all([
    bakery.bake(req.query.template, req.query.processo),
    dbi.Processo.findOne({ _id: req.query.processo })
  ])

  res.set({
    'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'Content-Disposition': `attachment; filename="processo ${processo.nome.replace(/\//g, '-')}.docx"`
  })
  res.send(doc)
})

module.exports = router
