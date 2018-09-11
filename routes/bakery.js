const asyncHandler = require('express-async-handler')
const Docxtemplater = require('docxtemplater')
const express = require('express')
const fs = require('fs')
const Jszip = require('jszip')
const mongoose = require('mongoose')
const path = require('path')
const util = require('util')

const arrayUtils = require('../utils/arrayUtils')
const CustomError = require('../utils/CustomError')


const router = express.Router()
const readFile = util.promisify(fs.readFile)
const Processo = mongoose.model('Processo')
const RequisitoAdmissibilidade = mongoose.model('RequisitoAdmissibilidade')

router.get('/bake', asyncHandler(async (req, res) => {

  if (!arrayUtils.containsAll(Object.keys(req.query), ['template', 'processo']))
    throw new CustomError('Missing obrigatory parameters')

  var template = await readFile(path.resolve(`../doc-models/${req.query.template}.docx`), 'binary')

  var processo = await Processo.findOne({ _id: req.query.processo }).populate('documento.mtp.auditores')
  processo = processo.toObject()

  var incisoToIgnore = (processo.representante.isPessoaFisica) ? 'V' : 'IV'

  var requisitosPresentes = processo.documento.mtp.requisitosPresentes.map(r => r.toString())

  var requisitos = await RequisitoAdmissibilidade.find().lean()
  requisitos = requisitos.filter(r => r.inciso != incisoToIgnore)
  requisitos.forEach(r => r.id = r._id.toString())

  var parameters = {
    ...processo,
    isRepresentacao: processo.tipo === 'Representação',
    atendeTodosRequisitos: arrayUtils.containsAll(requisitosPresentes, requisitos.map(r => r.id)),
    requisitosPresentes: requisitos.filter(r => requisitosPresentes.includes(r.id)).map(r => r.descricao.presente).join(', '),
    requisitosAusentes: requisitos.filter(r => !requisitosPresentes.includes(r.id)).map(r => r.descricao.ausente).join(', '),
    incisosRequisitosAusentes: requisitos.filter(r => !requisitosPresentes.includes(r.id)).map(r => r.inciso).join(', '),
    fumusPresente: processo.documento.mtp.pressupostos.presenteFumus,
    periculumPresente: processo.documento.mtp.pressupostos.presentePericulum === 'SIM',
    periculumAusente: processo.documento.mtp.pressupostos.presentePericulum === 'NÃO',
    periculumReverso: processo.documento.mtp.pressupostos.presentePericulum === 'REVERSO',
    cautelarPropostoDeferimento: processo.documento.mtp.pressupostos.presenteFumus && processo.documento.mtp.pressupostos.presentePericulum.toUpperCase() === 'SIM',
    auditores: processo.documento.mtp.auditores
  }

  var zip = new Jszip(template)
  var doc = new Docxtemplater()
  doc.loadZip(zip)

  doc.setData(parameters)
  doc.render()

  var buffer = doc.getZip().generate({ type: 'nodebuffer' })

  res.type('docx')
  res.send(buffer)
}))

module.exports = router
