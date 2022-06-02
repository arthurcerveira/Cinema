const express = require('express')

const { validateAdminToken } = require('../middlewares/authMiddleware')
const salaController = require('../controllers/salaController')
const salaRouter = express.Router()

salaRouter.get('/sala/', salaController.getSala)
salaRouter.get('/sala/numero/:numero', salaController.getSalaByNumero)
salaRouter.get('/sala/:id', salaController.getSalaId)
salaRouter.put('/sala/:id', validateAdminToken, salaController.updateSala)
salaRouter.post('/sala', validateAdminToken, salaController.createSala)
salaRouter.delete('/sala/:id', validateAdminToken, salaController.deleteSala)


module.exports = salaRouter