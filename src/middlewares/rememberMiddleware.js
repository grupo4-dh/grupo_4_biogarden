// rememberMiddleware loggea al usuario automaticamente si hay una cookie guardada en el navegador

const db = require('../database/models')

module.exports = (req, res, next) => {
    if (req.cookies.remember != undefined && req.session.usuarioLogueado == undefined) {
        db.Users.findOne({
            where: {
                email: req.cookies.remember
            }
        })
        .then(function(user) {
            delete user.password                    // Por seguridad, borramos el password
            req.session.usuarioLogueado = user;     // Crea la session
        })
        .catch((error) => {
            return res.send(error)
        });
    }
    next();
}

