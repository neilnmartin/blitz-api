const express = require('express')
const morgan = require('morgan')
const router = require('./routes/index')

const app = express();

app.use('/', morgan('dev'))
app.use('/api', router)

module.exports = app