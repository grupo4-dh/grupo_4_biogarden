// ENRUTADOR USERS

const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const multer =require('multer');
const path=require('path');
const registerValidator = require('../validations/registerValidator.js');
const loginValidator= require('../validations/loginValidator.js')

//faltarian los middelwares
const authMiddelware = require('../middelwares/authMiddelware');
const guestMiddelware = require('../middelwares/guestMiddelware');

// Configuramos multer en la variable upload para subida de archivos
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../../public/uploads/avatars'))//carpeta donde se guarda la imagen
    },
    filename: function (req, file, cb) {
        cb(null, req.body.email + path.extname(file.originalname)) // Recordar lo de la extensión
    }
})
var upload = multer({ storage: storage })

// Users register
router.get('/register', usersController.register)
router.post('/register', upload.single('avatar'), registerValidator, usersController.save)//guardamos el usuario y agregamos el middelware


// Users login
router.get('/login',usersController.login)
router.post('/login',loginValidator,usersController.processLogin)

// Users profile y usamos session
router.get('/profile',authMiddelware, usersController.profile)

//cerraar sesion
//router.post('/profile', usersController.cerrarSesion)
//req.session.destroy()
//res.redirect(/home)

module.exports = router;