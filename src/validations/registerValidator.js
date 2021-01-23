// registerValidator valida los datos del Form de Registro

const { check, body } = require('express-validator');

const db = require('../database/models')

module.exports = [
    check("name")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isLength({ min: 3, max: 20 }).withMessage('El nombre tiene que tener como mínimo 3 caracteres'),

    check("last_name")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isLength({ min: 3, max: 20 }).withMessage('El nombre tiene que tener como mínimo 3 caracteres'),

    check("email")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isEmail().withMessage("Debes ingresar un email válido"),
    
    check("password")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isLength({ min:6, max:15 }).withMessage("La contraseña debe contener como mínimo 6 caracteres"),
        
    body("email").custom(function(value) {
        return true
        // db.Users.findOne({
        //     where: {
        //         email: value
        //     }
        // }).then( userFound => {
        //     if (userFound) {
        //         return false
        //     }
        //     return true
        // })
        // .catch( error => {
        //     console.log(error)
        // })
    }).withMessage("Este email ya está registrado")
]