const express = require('express')


const sessaoController = require('../controllers/sessaoController.js')
const sessaoRouter = express.Router()

sessaoRouter.get('/sessao/', sessaoController.getSessao)
sessaoRouter.get('/sessao/:id', sessaoController.getSessaoId)
sessaoRouter.put('/sessao/:id', sessaoController.updateSessao)
sessaoRouter.post('/sessao/', sessaoController.createSessao)
sessaoRouter.delete('/sessao/:id', sessaoController.deleteSessao)



module.exports = sessaoRouter