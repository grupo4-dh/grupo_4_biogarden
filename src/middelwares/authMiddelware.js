
const path = require ('path');
const fs = require ('fs')

let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf8'))


module.exports = (req, res, next) => {//revisa si el usuario esta logueado y te deja ingresar a la ruta profile
    if (req.session.usuarioLogueado != undefined){
        for(let i = 0; i < users.length; i++) {
            if (users[i].email == req.cookies.usuarioLogueado){
                req.session.usuarioLogueado= users[i].email;
                    res.locals.usuarioLogueado = users[i];
               } 
               
               
     }

        next();
    }
    return res.redirect('/users/login');// si  no esta logueado, te dirije a la pagina de logueo
}


