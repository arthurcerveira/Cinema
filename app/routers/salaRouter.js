const express = require('express')


const salaController = require('../controllers/salaController')
const salaRouter = express.Router()

salaRouter.get('/sala/', salaController.getsala)
salaRouter.get('/sala/:id', salaController.getsalaId)
salaRouter.put('/sala/:id', salaController.updatesala)
salaRouter.post('/sala', salaController.createsala)
salaRouter.delete('/sala/:id', salaController.deletesala)
module.exports = salaRouter