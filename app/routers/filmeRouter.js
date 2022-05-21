const express = require('express')

const { validateAdminToken } = require('../middlewares/authMiddleware')
const filmeController = require('../controllers/filmeController')
const filmeRouter = express.Router()

filmeRouter.get('/filme/', filmeController.getFilme)
filmeRouter.get('/filme/:id', filmeController.getFilmeId)
filmeRouter.put('/filme/:id', validateAdminToken, filmeController.updateFilme)
filmeRouter.post('/filme/', validateAdminToken, filmeController.createFilme)
filmeRouter.delete('/filme/:id', validateAdminToken, filmeController.deleteFilme)



module.exports = filmeRouter