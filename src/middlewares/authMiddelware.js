
const path = require ('path'); //cookie middleware- valida si 
const fs = require ('fs')

let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf8'))


module.exports = (req, res, next) => {//revisa si el usuario esta logueado y te deja ingresar a la ruta profile pero le falta el boton en el header

        if (req.session.usuarioLogueado != undefined) {
            next(); 
        }else{
            return res.redirect('/users/login');// si  no esta logueado, te dirije a la pagina de logueo
        }
}


