// rememberMiddleware loggea al usuario automaticamente si hay una cookie guardada en el navegador

const db = require('../database/models')

module.exports = (req, res, next) => {
    //console.log("se ejecuto rememberM")
    console.log(req.cookies)
    if (req.cookies.remember && (! req.session.usuarioLogueado)) {
        console.log('se busca un usuario')
        db.Users.findOne({
            where: {
                email: req.cookies.remember
            }
        })
        .then(function(user) {
            delete user.password                    // Por seguridad, borramos el password
            req.session.usuarioLogueado = user;     // Crea la session
            next();
        })
        .catch((error) => {
            return res.send(error)
        });
    }
    next();
}

