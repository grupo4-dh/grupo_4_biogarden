
const path = require ('path');
const fs = require ('fs')

let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf8'))


function rememberMiddleware (req, res, next) {//si hay cookies
    if (req.cookies.remember != undefined && req.session.usuarioLogueado==undefined){
        for (let i = 0; i < users.length; i++) {
        if (users[i].email == req.cookies.remember){//compara con la bBDD
             req.session.usuarioLogueado= users[i];//crea la session
          
        } 
       
        }
       
}
next();
}


module.exports = rememberMiddleware;