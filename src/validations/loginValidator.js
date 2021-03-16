// loginValidator valida los datos del Form de Login

const { check } = require("express-validator");

module.exports = [
    check("email")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isEmail().withMessage("Debes ingresar un email válido"),
        
    check("password")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isLength({ min:8, max:15 }).withMessage("La contraseña debe contener como mínimo 8 caracteres"),
]