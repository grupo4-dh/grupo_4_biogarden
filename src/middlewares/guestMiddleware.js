// guestMiddleware valida que el usuario no esté logueado
// Si está logueado, lo reenvía al perfil

module.exports = (req, res, next) => {
    if (req.session.usuarioLogueado == undefined) { 
        next()
    } else {
        res.redirect('/users/profile')
    }
}
