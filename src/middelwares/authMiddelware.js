module.exports = (req, res, next) => {//chequea que el usuario este logueado y permite mantener la sesion en todas las paginas
    if (req.session.usuarioALoguearse != undefined){
        for(let i = 0; i < users.length; i++) {
            if (users[i].email == req.cookies.usuarioALoguearse){
                req.session.usuarioLogueado= users[i].email;
                    res.locals.usuarioLogueado = users[i];
               } 
               
               
     }

        next();
    }
    return res.redirect('/users/profile');// revisar si esyta bien esto 
}

