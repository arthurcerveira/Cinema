const express = require('express')

const { validateAdminToken } = require('../middlewares/authMiddleware')
const produtoController = require('../controllers/produtoController.js')
const produtoRouter = express.Router()

produtoRouter.get('/produto/', produtoController.getProduto)
produtoRouter.get('/produto/ingresso', produtoController.getIngresso)
produtoRouter.get('/produto/:id', produtoController.getProdutoId)
produtoRouter.put('/produto/:id', validateAdminToken, produtoController.updateProduto)
produtoRouter.post('/produto/', validateAdminToken, produtoController.createProduto)
produtoRouter.delete('/produto/:id', validateAdminToken, produtoController.deleteProduto)




module.exports = produtoRouter