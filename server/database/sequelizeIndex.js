const Sequelize = require('sequelize')
const { dbName, dbUserName, dbPassword, dbHost } = require('../config/config').database

console.log(process.env)

const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  logging: process.env.STAGE === 'dev' ? true : false,
})

sequelize.authenticate()
  .then(() => console.log('connection authenticated'))
  .catch((e) => console.error(e))

module.exports = { sequelize }