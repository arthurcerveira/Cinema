const express = require('express')

const filmeRouter = require('./filmeRouter')
const salaRouter = require('./salaRouter')
const adminRouter = require('./adminRouter')


const router = express.Router()

router.use(filmeRouter)
router.use(salaRouter)
router.use(adminRouter)

module.exports = router