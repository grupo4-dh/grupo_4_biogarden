// rememberMiddleware loggea al usuario automaticamente si hay una cookie guardada en el navegador

const db = require('../database/models')

module.exports = async (req, res, next) => {
    if (req.cookies.remember && (! req.session.usuarioLogueado)) {
        await db.Users.findOne({
            where: { email: req.cookies.remember },
            include: { all: true }
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

