const mongoose = require('mongoose')


const Processo = mongoose.model('Processo')
const RequisitoAdmissibilidade = mongoose.model('RequisitoAdmissibilidade')

function getRequisitosAusentes (processo) {

  var incisosPresentes = processo.mtp.admissibilidade.requisitosPresentes.map(r => r.inciso)
  var incisosToFilterOut = incisosPresentes.concat((processo.requerente.isPessoaFisica) ? 'V' : 'IV')

  return RequisitoAdmissibilidade.find({ inciso: { $nin: incisosToFilterOut } }).lean()
}

async function adaptToTemplate (processo) {

  processo.mtp = processo.documentos.find(d => d.template === 'MTP')
  delete processo.documentos

  processo.mtp.cautelar.analisada = processo.workflow.some(s => ['f-mtp-1', 'f-mtp-2'].includes(s.state))
  processo.mtp.admissibilidade.analisada = processo.workflow.some(s => ['f-mtp-1', 'f-mtp-3'].includes(s.state))
  processo.mtp.admissibilidade.requisitosAusentes = await getRequisitosAusentes(processo)

  return processo
}

module.exports = {
  async getParameters (_id) {

    var processo = await Processo.findOne({ _id })
      .populate([
        { path: 'documentos.auditores', justOne: false },
        { path: 'documentos.admissibilidade.requisitosPresentes', justOne: false }
      ])
      .lean()

    return adaptToTemplate(processo)
  }
}
