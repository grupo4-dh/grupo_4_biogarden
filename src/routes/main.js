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
router.get("/comoComprar", mainController.comoComprar)

// For test
router.get("/test", mainController.test);

module.exports = router;