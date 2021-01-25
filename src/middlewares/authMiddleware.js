// authMiddleware valida que el user esté logueado
// Si no está logueado, lo reenvía a la vista de login

const db = require('../database/models')

module.exports = (req, res, next) => {
    if (req.session.usuarioLogueado != undefined) {
        next();
    } else {
        res.redirect('/users/login');
    }
}


