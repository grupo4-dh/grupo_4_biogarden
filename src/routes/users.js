// ENRUTADOR USERS

const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const multer =require('multer');
const path=require('path');
const registerValidator=require('../validations/registerValidator.js');

//para uploads de imagenes
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/uploads/avatars'))
    },
    filename: function (req, file, cb) {
      cb(null, req.body.email + '-' + path.extname(file.originalname))//recordar lo de la extension
    }
  })
   
  var upload = multer({ storage: storage })

// Users register
router.get('/register', usersController.register)
router.post('/register',upload.single('avatar'),registerValidator,usersController.save)//guardamos el usuario y agregamos el middelware


// Users login
router.get('/login', usersController.login)
router.post('/login',usersController.processLogin)

// Users profile y usamos session
router.get('/profile',registerValidator, usersController.profile)

module.exports = router;