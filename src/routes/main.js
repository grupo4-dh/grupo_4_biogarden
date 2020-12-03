// ENRUTADOR MAIN

const express = require('express')
const router = express.Router()

const mainController = require('../controllers/mainController')

// Home
router.get('/', mainController.index)

module.exports = router;