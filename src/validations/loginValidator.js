// loginValidator valida los datos del Form de Login

const { check } = require("express-validator");

module.exports = [
    check("email")
    .isEmail().withMessage("Debes ingresar un email válido"),
        
    check("password")
    .isLength({ min:6, max:15 }).withMessage("La contraseña debe contener como mínimo 6 caracteres")
]