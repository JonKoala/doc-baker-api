const mongoose = require('mongoose')


const Processo = mongoose.model('Processo')
const RequisitoAdmissibilidade = mongoose.model('RequisitoAdmissibilidade')

async function getAdmissibilidadeParameters (processo) {

  var parameters = {
    temAdmissibilidade: processo.workflow.some(s => ['f-mtp-1', 'f-mtp-3'].includes(s.state))
  }

  if (parameters.temAdmissibilidade) {

    var incisoToIgnore = (processo.representante.isPessoaFisica) ? 'V' : 'IV'

    var requisitos = await RequisitoAdmissibilidade.find().lean()
    requisitos = requisitos.filter(r => r.inciso != incisoToIgnore)
    requisitos.forEach(r => r.id = r._id.toString())
    var requisitosIds = requisitos.map(r => r.id)

    var requisitosPresentes = processo.documento.mtp.requisitosPresentes.map(r => r.toString()).filter(r => requisitosIds.includes(r))

    // populate parameters
    parameters.atendeTodosRequisitos = requisitosPresentes.length === requisitos.length
    parameters.atendeNenhumRequisito = requisitosPresentes.length === 0
    if (!parameters.atendeTodosRequisitos && !parameters.atendeNenhumRequisito) {
      parameters.requisitosPresentes = requisitos.filter(r => requisitosPresentes.includes(r.id)).map(r => r.descricao.presente).join(', ')
      parameters.requisitosAusentes = requisitos.filter(r => !requisitosPresentes.includes(r.id)).map(r => r.descricao.ausente).join(', ')
      parameters.incisosRequisitosAusentes = requisitos.filter(r => !requisitosPresentes.includes(r.id)).map(r => r.inciso).join(', ')
    }

  }

  return parameters
}

function getPressupostosParameters (processo) {

  var parameters = {
    temPressupostos: processo.workflow.some(s => ['f-mtp-1', 'f-mtp-2'].includes(s.state))
  }

  if (parameters.temPressupostos) {

    parameters.fumusPresente = processo.documento.mtp.pressupostos.presenteFumus
    parameters.periculumPresente = processo.documento.mtp.pressupostos.presentePericulum.toUpperCase() === 'SIM'
    parameters.periculumAusente = processo.documento.mtp.pressupostos.presentePericulum.toUpperCase() === 'NÃO'
    parameters.periculumReverso = processo.documento.mtp.pressupostos.presentePericulum.toUpperCase() === 'REVERSO'
    parameters.cautelarPropostoDeferimento = parameters.fumusPresente && parameters.periculumPresente

  }

  return parameters
}

module.exports = {
  async getParameters (_id) {

    var processo = await Processo.findOne({ _id }).populate('documento.mtp.auditores').lean()
    var admissibilidadeParameters = await getAdmissibilidadeParameters(processo)
    var pressupostosParameters = getPressupostosParameters(processo)

    return {
      ...processo,
      ...admissibilidadeParameters,
      ...pressupostosParameters,
      tipoRepresentacao: processo.tipo === 'Representação',
      auditores: processo.documento.mtp.auditores
    }
  }
}
