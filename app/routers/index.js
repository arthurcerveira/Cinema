const express = require('express')

const filmeRouter = require('./filmeRouter')
const salaRouter = require('./salaRouter')
const adminRouter = require('./adminRouter')
const sessaoRouter = require('./sessaoRouter')
const clienteRouter = require('./clienteRouter')
const produtoRouter = require('./produtoRouter')
const profileRouter = require('./profileRouter')


const router = express.Router()

router.use(filmeRouter)
router.use(salaRouter)
router.use(adminRouter)
router.use(sessaoRouter)
router.use(clienteRouter)
router.use(produtoRouter)
router.use(profileRouter)

module.exports = router