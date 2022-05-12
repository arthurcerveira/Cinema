const express = require('express')

const filmeRouter = require('./filmeRouter')
const salaRouter = require('./salaRouter')
const router = express.Router()

router.use(filmeRouter)
router.use(salaRouter)

module.exports = router