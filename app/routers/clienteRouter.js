const express = require('express')


const clienteController = require('../controllers/clienteController')
const clienteRouter = express.Router()

clienteRouter.get('/cliente/', clienteController.getClientes)
clienteRouter.post('/cliente', clienteController.createCliente)
clienteRouter.post('/cliente/login', clienteController.login)

module.exports = clienteRouter