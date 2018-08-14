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
    afterFind (result) {
      if (result == null)
        return null
        
      if (result.constructor === Array)
        result.forEach(r => r.workflow = JSON.parse(r.workflow))
      else
        result.workflow = JSON.parse(result.workflow)

      return result
    },
    afterCreate (result) {
      result.workflow = JSON.parse(result.workflow)
      return result
    },
    afterUpdate (result) {
      result.workflow = JSON.parse(result.workflow)
      return result
    }
  }
})
