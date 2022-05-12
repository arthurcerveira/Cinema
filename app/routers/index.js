const express = require('express')

const filmeRouter = require('./filmeRouter')
const salaRouter = require('./salaRouter')
const adminRouter = require('./adminRouter')
const sessaoRouter = require('./sessaoRouter')



const router = express.Router()

router.use(filmeRouter)
router.use(salaRouter)
router.use(adminRouter)
router.use(sessaoRouter)

module.exports = router