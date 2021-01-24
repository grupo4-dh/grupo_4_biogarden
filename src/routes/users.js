// Users Router

// Express y controlador
const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

// Validators
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator')
const editValidator = require('../validations/editValidator')

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

// Multer
// Configuramos multer en la variable upload para subida de archivos a memoria
// Si se pasan las validaciones, los archivos se guardan en el disco
const multer = require('multer');
var storage = multer.memoryStorage() 
var upload = multer({ storage: storage })

// Users register
router.get('/register', guestMiddleware, usersController.register)
router.post('/register', upload.single('avatar'), registerValidator, usersController.save)

// Users login and logout
router.get('/login', guestMiddleware, usersController.login)
router.post('/login', loginValidator, usersController.processLogin)
router.get('/logout', usersController.processLogout)

// Users profile
router.get('/profile', authMiddleware, usersController.profile)
router.get('/edit', authMiddleware, usersController.edit)
router.post('/edit', upload.single('avatar'), editValidator, usersController.udpate)

module.exports = router;