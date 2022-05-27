const express = require('express')


const adminController = require('../controllers/adminController')
const adminRouter = express.Router()

//adminRouter.get('/admin/', adminController.getFilme)

//adminRouter.post('/admin/', adminController.login)
//para adicionar um admin, descomente essa rota e sua função equivalente no adminController
adminRouter.post('/admin/', adminController.addAdmin) 
adminRouter.post('/admin/login', adminController.login)

adminRouter.get('/admin/', adminController.getAll)
adminRouter.get('/historico/:id', adminController.getHistoricoId)
adminRouter.get('/historico/pag/:id/:pag', adminController.getHistoricoPag)


module.exports = adminRouter