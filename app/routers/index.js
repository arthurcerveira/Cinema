const express = require('express')

const filmeRouter = require('./filmeRouter')
const salaRouter = require('./salaRouter')
const adminRouter = require('./adminRouter')
const sessaoRouter = require('./sessaoRouter')
const clienteRouter = require('./clienteRouter')
const produtoRouter = require('./produtoRouter')
const cadeirasSalasRouter = require('./cadeirasSalasRouter')
const cadeirasRouter = require('./cadeirasRouter')

const router = express.Router()

router.use(filmeRouter)
router.use(salaRouter)
router.use(adminRouter)
router.use(sessaoRouter)
router.use(clienteRouter)
router.use(produtoRouter)
router.use(cadeirasSalasRouter)
router.use(cadeirasRouter)

module.exports = router