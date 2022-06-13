const express = require('express');

const { validateAdminToken } = require('../middlewares/authMiddleware')

const cadeirasSalaController = require('../controllers/cadeirasSalasController');
const cadeirasSalasRouter = express.Router();

cadeirasSalasRouter.get('/cadeirasSalas/:id', cadeirasSalaController.getCadeirasSalas);
cadeirasSalasRouter.put('/cadeirasSalas/:id', validateAdminToken, cadeirasSalaController.updateCadeirasSalas);
cadeirasSalasRouter.delete('/cadeirasSalas/:id', validateAdminToken, cadeirasSalaController.deleteCadeirasSalas);


module.exports = cadeirasSalasRouter;