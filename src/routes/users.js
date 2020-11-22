// ENRUTADOR USERS

const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')

// Users register
router.get('/register', usersController.register)

// Users login
router.get('/login', usersController.login)

// Users profile
router.get('/profile', usersController.profile)

module.exports = router;