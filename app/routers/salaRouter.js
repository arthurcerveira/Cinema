const express = require('express')


const salaController = require('../controllers/salaController')
const salaRouter = express.Router()

salaRouter.get('/sala/', salaController.getSala)
salaRouter.get('/sala/:id', salaController.getSalaId)
salaRouter.put('/sala/:id', salaController.updateSala)
salaRouter.post('/sala', salaController.createSala)
salaRouter.delete('/sala/:id', salaController.deleteSala)
module.exports = salaRouter