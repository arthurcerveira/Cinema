const express = require('express')

const compraController = require('../controllers/compraController')
const { validateToken, validateAdminToken } = require('../middlewares/authMiddleware')
const compraRouter = express.Router()

compraRouter.get('/compra', compraController.getCompras)
compraRouter.get('/compra/cliente/:id', compraController.getComprasByClienteUser)
compraRouter.get('/compra/:id', compraController.getComprasId)
compraRouter.post('/compra', validateToken, compraController.createCompra)
compraRouter.put('/compra/:id', validateAdminToken, compraController.updateCompra)
compraRouter.delete('/compra/:id', validateAdminToken, compraController.deleteCompra)
compraRouter.post('/compra/:id', validateToken, compraController.payCompra)


module.exports = compraRouter
