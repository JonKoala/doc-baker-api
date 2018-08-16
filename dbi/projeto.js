const sequelize = require('sequelize')

const db = require('./connection')


module.exports = db.define('projeto', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: sequelize.STRING,
  workflow: sequelize.STRING,
  numero_processo: sequelize.STRING,
  ano_processo: sequelize.INTEGER
}, {
  timestamps: false,
  tableName: 'Projeto',
  hooks: {
    beforeValidate (projeto) {
      if (projeto.workflow && projeto.workflow.constructor === Array)
        projeto.workflow = JSON.stringify(projeto.workflow)
      return projeto
    },
    afterFind (projeto) {
      if (projeto == null)
        return null

      if (projeto.constructor === Array)
        projeto.forEach(p => p.workflow = JSON.parse(p.workflow))
      else
        projeto.workflow = JSON.parse(projeto.workflow)

      return projeto
    },
    afterCreate (projeto) {
      projeto.workflow = JSON.parse(projeto.workflow)
      return projeto
    },
    afterUpdate (projeto) {
      projeto.workflow = JSON.parse(projeto.workflow)
      return projeto
    }
  }
})
