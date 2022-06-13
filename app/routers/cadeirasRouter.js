const express = require('express');

const { validateAdminToken } = require('../middlewares/authMiddleware')

const cadeiraController = require('../controllers/cadeiraController');
const cadeirasSalasRouter = express.Router();

cadeirasSalasRouter.get('/cadeirasSessao/:id', cadeiraController.getCadeirasSessao);


module.exports = cadeirasSalasRouter;