const express = require('express')

const { validateToken} = require('../middlewares/authMiddleware')
const profileController = require('../controllers/profileControler')
const profileRouter = express.Router()

profileRouter.get('/profile/', validateToken, profileController.getProfile)
profileRouter.get('/profile/:id', validateToken, profileController.getProfile)

module.exports = profileRouter