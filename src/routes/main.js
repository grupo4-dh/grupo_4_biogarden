// ENRUTADOR MAIN

const express = require('express')
const router = express.Router()

const mainController = require('../controllers/mainController')

// Home
router.get('/', mainController.index)

//GENERALES
router.get("/contacto",mainController.contacto)
router.post("/contacto",mainController.processContacto)
router.get("/quienesSomos", mainController.quienesSomos)

module.exports = router;