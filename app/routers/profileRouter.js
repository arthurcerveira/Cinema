const express = require('express')

const profileController = require('../controllers/profileControler')
const profileRouter = express.Router()

profileRouter.get('/profile/', profileController.getProfile)
profileRouter.get('/profile/:id', profileController.getProfile)

module.exports = profileRouter