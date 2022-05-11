const express = require('express')

const filmeRouter = require('./filmeRouter')

const router = express.Router()

router.use(filmeRouter)

module.exports = router