const express = require('express')


const clienteController = require('../controllers/clienteController.js')
const clienteRouter = express.Router()

clienteRouter.get('/cliente/', clienteController.getCliente)
clienteRouter.get('/cliente/:id', clienteController.getClienteId)
clienteRouter.put('/cliente/:id', clienteController.updateCliente)
clienteRouter.post('/cliente/', clienteController.createCliente)
clienteRouter.delete('/cliente/:id', clienteController.deleteCliente)



module.exports = clienteRouter