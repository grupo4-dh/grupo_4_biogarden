//array de validaciones
const { check } = require('express-validator');
const { body } = require('express-validator');

const fs = require("fs");
const path = require('path');

module.exports = [
    check('name')
    .isLength({min:2,max:20})
    .withMessage('el nombre tiene que tener como minimo 2 caracterres'),
    
    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email valido'),
    
    check('password')
    .isLength({min:6,max:12})
    .withMessage('la contrasena debe tener como nimo 6 caracteres y como maximo 12'),
    
/*     body('email').custom(function(value){
        let usersJson = fs.readFileSync(path.join(__dirname,'../database/users.json'), 'utf8');
        let users;
        if(usersJson == ''){
            users = [];
        }else{
            users = JSON.parse(usersJson);
        }
        for (let i=0; i < users.length; i++) {
            if (users[i].email == value) {
                return false;
            }
        }
        return true;
    }) */
]
