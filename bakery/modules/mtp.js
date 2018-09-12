const mongoose = require('mongoose')

const arrayUtils = require('../../utils/arrayUtils')


const Processo = mongoose.model('Processo')
const RequisitoAdmissibilidade = mongoose.model('RequisitoAdmissibilidade')

module.exports = {
  async getParameters (_id) {

    var processo = await Processo.findOne({ _id }).populate('documento.mtp.auditores').lean()

    var documento = processo.documento.mtp
    var requisitosPresentes = documento.requisitosPresentes.map(r => r.toString())
    var incisoToIgnore = (processo.representante.isPessoaFisica) ? 'V' : 'IV'

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
      fumusPresente: documento.pressupostos.presenteFumus,
      periculumPresente: documento.pressupostos.presentePericulum === 'SIM',
      periculumAusente: documento.pressupostos.presentePericulum === 'NÃO',
      periculumReverso: documento.pressupostos.presentePericulum === 'REVERSO',
      cautelarPropostoDeferimento: documento.pressupostos.presenteFumus && documento.pressupostos.presentePericulum.toUpperCase() === 'SIM',
      auditores: documento.auditores
    }

    return parameters
  }
}
