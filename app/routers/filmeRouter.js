const express = require('express')


const filmeController = require('../controllers/filmeController')
const filmeRouter = express.Router()

filmeRouter.get('/filme/', filmeController.getFilme)
filmeRouter.get('/filme/:id', filmeController.getFilmeId)
filmeRouter.get('/filme/pag/:pag', filmeController.getFilmePag)
filmeRouter.put('/filme/:id', filmeController.updateFilme)
filmeRouter.post('/filme/', filmeController.createFilme)
filmeRouter.delete('/filme/:id', filmeController.deleteFilme)



module.exports = filmeRouter