// registerValidator valida los datos del Form de Registro

const { check, body } = require('express-validator');

const db = require('../database/models')

module.exports = [
    check("name")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isLength({ min: 2, max: 20 }).withMessage('El nombre tiene que tener como mínimo 2 caracteres'),

    check("last_name")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isLength({ min: 2, max: 20 }).withMessage('El apellido tiene que tener como mínimo 2 caracteres'),

    check("email")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isEmail().withMessage("Debes ingresar un email válido")
    .custom(async function(email) {
        let registeredEmail = await db.Users.findOne({ where : { email: email } });
        if (registeredEmail) {
            throw new Error ("Este email ya está registrado")
        }
    }),
    
    check("password")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isLength({ min:8, max:15 }).withMessage("La contraseña debe contener como mínimo 8 caracteres"),

    check("repassword")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isLength({ min:8, max:15 }).withMessage("La contraseña debe contener como mínimo 8 caracteres")
    .custom(async (repassword, {req}) => { 
        let password = req.body.password;
        if(password !== repassword){ 
          throw new Error('Las contraseñas deben ser iguales') 
        }
    }), 
]