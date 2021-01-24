// usuarioRender envia la session actual a res.locals para poder utilizarla en las vistas 

module.exports = (req, res, next) => { // Revisa si el usuario esta logueado y te deja ingresar a la ruta profile pero le falta el boton en el header
    res.locals.usuarioLogueado = req.session.usuarioLogueado // no se menciona en la vista locals  
    next();
}


