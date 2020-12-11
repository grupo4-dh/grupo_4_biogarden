const {check}=require("express-validator");
module.exports=[
    check("email").isEmail().withMessage("debes ingresar un email valido"),
    check("password").isLength({min:6, max:15}).withMessage("la contraseña debe contener como minimo 6 caracteres")
]