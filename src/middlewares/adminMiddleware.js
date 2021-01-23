// adminMiddleware valida que el user logueado tenga el rol de admin
// Si no está logueado, lo reenvía a la vista de login
// Si está logueado pero no es admin, lo reenvía a la home

const db = require('../database/models')

module.exports = (req, res, next) => {
    if (req.session.usuarioLogueado == undefined) {
        res.redirect('/users/login')
    } else {
        db.Users.findByPk(req.session.usuarioLogueado.id, {
            include: { all: true }
        })
        .then(function(user) {
            if (user.user_category.name == 'admin') {
                next();
            } else {
                res.redirect('/')        
            }
        })
        .catch((error) => {
            return res.send(error)
        });
    }
}


