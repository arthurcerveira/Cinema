const express = require('express')
const clienteController = require('../controllers/clienteController.js')
const { validateToken } = require('../middlewares/authMiddleware')
const clienteRouter = express.Router()

clienteRouter.get('/cliente/', validateToken, clienteController.getCliente)
clienteRouter.get('/cliente/:id', validateToken, clienteController.getClienteId)
clienteRouter.put('/cliente/:id', validateToken, clienteController.updateCliente)
clienteRouter.post('/cliente/', clienteController.createCliente)
clienteRouter.delete('/cliente/:id', validateToken, clienteController.deleteCliente)
clienteRouter.post('/cliente/login', clienteController.login)

module.exports = clienteRouter