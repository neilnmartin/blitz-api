let router = require('express').Router()
const controllers = require('../controllers/index')

router
  .get('/art', controllers.artControllers.get)
  .post('/art', controllers.artControllers.post)
  .put('/art', controllers.artControllers.put)
  .delete('/art', controllers.artControllers.delete)

module.exports = router