const express = require('express')

const filmeRouter = require('./filmeRouter')
const salaRouter = require('./salaRouter')
const adminRouter = require('./adminRouter')
const sessaoRouter = require('./sessaoRouter')
const clienteRouter = require('./clienteRouter')
const produtoRouter = require('./produtoRouter')
const cadeirasSalasRouter = require('./cadeirasSalasRouter')
const compraRouter = require('./compraRouter')
const cadeirasRouter = require('./cadeirasRouter')
const profileRouter = require('./profileRouter')

const router = express.Router()

router.use(filmeRouter)
router.use(salaRouter)
router.use(adminRouter)
router.use(sessaoRouter)
router.use(clienteRouter)
router.use(produtoRouter)
router.use(cadeirasSalasRouter)
router.use(compraRouter)
router.use(cadeirasRouter)
router.use(profileRouter)

module.exports = router