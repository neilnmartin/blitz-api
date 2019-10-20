const Sequelize = require('sequelize')
const { dbName, dbUserName, dbPassword, dbHost } = require('../config/config')

const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
  host: dbHost,
  dialect: 'postgres'
})

sequelize.authenticate()
  .then(() => console.log('connection authenticated'))
  .catch((e) => console.error(e))

module.exports = { sequelize }