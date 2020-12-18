function rememberMiddleware (req, res, next) {
   

    if (req.cookies.remember!= undefined && req.session.usuarioLogueado == undefined) {
        req.session.usuarioLogueado = req.cookies.remember;
    }
    console.log(req.cookies);
    next();
}

module.exports = rememberMiddleware;