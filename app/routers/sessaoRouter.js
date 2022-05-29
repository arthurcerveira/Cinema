const express = require('express')

const { validateAdminToken } = require('../middlewares/authMiddleware')
const sessaoController = require('../controllers/sessaoController.js')
const sessaoRouter = express.Router()

sessaoRouter.get('/sessao/', sessaoController.getSessao)
sessaoRouter.get('/catalogo/', sessaoController.getCatalogo)
sessaoRouter.get('/sessao/:id', sessaoController.getSessaoId)
sessaoRouter.put('/sessao/:id', validateAdminToken, sessaoController.updateSessao)
sessaoRouter.post('/sessao/', validateAdminToken, sessaoController.createSessao)
sessaoRouter.delete('/sessao/:id', validateAdminToken, sessaoController.deleteSessao)



module.exports = sessaoRouter