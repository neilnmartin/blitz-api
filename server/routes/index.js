let router = require('express').Router()
const controllers = require('../controllers/index')

router
  .get('/art', controllers.artControllers.get)
  .post('/art', controllers.artControllers.post)
  .put('/art', controllers.artControllers.put)
  .delete('/art', controllers.artControllers.delete)
router
  .get('/art', controllers.userControllers.get)
  .post('/art', controllers.userControllers.post)
  .put('/art', controllers.userControllers.put)
  .delete('/art', controllers.userControllers.delete)

module.exports = router