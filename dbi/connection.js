const config = require('config')
const Sequelize = require('sequelize')


module.exports = new Sequelize({
  dialect: 'mssql',
  dialectModulePath: 'sequelize-msnodesqlv8',
  dialectOptions: {
  	driver: config.get('db.driver'),
    trustedConnection: true
  },
  host: config.get('db.host'),
  database: config.get('db.database'),

  operatorsAliases: false,
  logging: false
})
