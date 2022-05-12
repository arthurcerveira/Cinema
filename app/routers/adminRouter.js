const express = require('express')


const adminController = require('../controllers/adminController')
const adminRouter = express.Router()

//adminRouter.get('/admin/', adminController.getFilme)

//adminRouter.post('/admin/', adminController.login)
//para adicionar um admin, descomente essa rota e sua função equivalente no adminController
//adminRouter.post('/admin/', adminController.addAdmin) 

adminRouter.get('/admin/:id', adminController.getHistoricoId)


module.exports = adminRouter