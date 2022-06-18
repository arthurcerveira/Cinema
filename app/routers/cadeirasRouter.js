const express = require('express');

const { validateAdminToken, validateToken } = require('../middlewares/authMiddleware')

const cadeiraController = require('../controllers/cadeiraController');
const cadeirasSalasRouter = express.Router();

cadeirasSalasRouter.get('/cadeirasSessao/:id', cadeiraController.getCadeirasSessao);
/* cadeirasSalasRouter.post('/buyCadeira', validateToken, cadeiraController.buyCadeira); */


module.exports = cadeirasSalasRouter;