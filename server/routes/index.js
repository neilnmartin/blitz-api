const router = require('express').Router()
const controllers = require('../controllers/index')

router
  .get('/art', controllers.artControllers.get)
  .post('/art', controllers.artControllers.post)
  .put('/art', controllers.artControllers.put)
  .delete('/art', controllers.artControllers.delete)
  
router
  .get('/user', controllers.userControllers.get)
  .post('/user', controllers.userControllers.post)
  .put('/user', controllers.userControllers.put)
  .delete('/user', controllers.userControllers.delete)

module.exports = router