const initOptions = {
  connect(client, databaseContext, useCount) {
    console.log('Connected to database:', client.connectionParameters.database);
  },
  disconnect(client, databaseContext) {
    console.log('Disconnected from database:', client.connectionParameters.database);
 }
}

const { dbName, dbUserName, dbPassword, dbHost } = require('../config/config').database

const pgp = require('pg-promise')(initOptions)

const dbConfig = {
  host: dbHost,
  number: 5432,
  database: dbName,
  user: dbUserName,
  password: dbPassword,
  keepAlive: true
  // check more advancecd parameters in docs (reapIntervalMillis, returnToHead, poolLog, parseInputDatesAsUTC, rows etc.)
}
const db = pgp(dbConfig)

module.exports = db