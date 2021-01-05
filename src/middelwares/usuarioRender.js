
const path = require ('path');
const fs = require ('fs')

let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf8'))


module.exports = (req, res, next) => {//revisa si el usuario esta logueado y te deja ingresar a la ruta profile pero le falta el boton en el header
    res.locals.usuarioLogueado = req.session.usuarioLogueado// no se menciona en la vista locals  
    next();
}


