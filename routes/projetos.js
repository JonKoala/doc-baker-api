const asyncHandler = require('express-async-handler')
const express = require('express')

const CustomError = require('../utils/CustomError')
const dbi = require('../dbi')


var router = express.Router()

router.get('/', asyncHandler(async (req, res, next) => {
  var projetos = await dbi.projeto.findAll({ raw: true })
  res.json(projetos)
}))

router.get('/:id', asyncHandler(async (req, res, next) => {
  var id = req.params.id;

  var projeto = await dbi.projeto.findById(id, { raw: true });
  res.json(projeto);
}))

router.post('/', asyncHandler(async (req, res, next) => {
  var projeto = req.body;

  var persistedProjeto = await dbi.projeto.create(projeto)
  res.json(persistedProjeto)
}))

router.put('/', asyncHandler(async (req, res, next) => {
  var projeto = req.body

  var existingProjeto = await dbi.projeto.findById(projeto.id)
  if (existingProjeto == null)
    throw new CustomError(`No record could be found for the specified ID: ${projeto.id}`)

  var updatedProjeto = await existingProjeto.update(projeto)
  res.json(updatedProjeto)
}))

module.exports = router
