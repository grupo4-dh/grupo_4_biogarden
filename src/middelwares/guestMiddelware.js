module.exports = (req, res, next) => {// chequea que el usuario no este logueado ( funciona en el register como en el login)
    if (req.session.usuarioLogueado != undefined) {//si esta persona no esta logueada, segui 
        next();//segui
    } else {
        res.redirect('/');// de lo contrario redirigi a la home si esta logueado
    }
}
