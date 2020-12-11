const fs = require('fs');
const path = require('path');
const bcrypt=require('bcrypt');
const { validationResult } = require('express-validator');

// Usamos archivos JSON como base de datos momentáneamente
// Los leemos (fs.readFileSync) y parseamos (JSON.parse) 
let usersJson = fs.readFileSync(path.join(__dirname,'../database/users.json'),'utf8');
let users = JSON.parse(usersJson);
//para generar id del usuario, tengo que obtener el id mayor creado(provisorio hastq ue veamos BBDD)
let ultimoId=0;
for (let i=0; i<users.length; i++){
    if(ultimoId <users[i].id){
        ultimoId=users[i].id
    }
}
module.exports = {
    register: function(req, res) {
        return res.render('users/register.ejs')
    },
//guardamos la info en la bbdd
    save: function(req, res){
        //validamos los errores del usuario
        let errors= validationResult(req);
        if(errors.isEmpty()){//si los errores es vacio
            //si no hay errores continuamos
            let nuevoUsuario={
            //guardo la BBDD del usuario
            id: ultimoId + 1,
            name: req.body.name,
            last_name: req.body.last_name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,12),//contrasena hasheada
            avatar:req.file.filename,//si es un solo archivo file

            }
            users.push(nuevoUsuario);
            //escribimos el usuario
            fs.writeFileSync(path.join(__dirname,'../database/users.json'), JSON.stringify(users,null,4));
            
            res.redirect('./login')
        }else{
            //si hay errores sigo por aca
            res.send(errors.mapped())
        }        
    },
    login: function(req, res) {
        return res.render('users/login.ejs');
    },
    processLogin:function(req,res){
        //valido los errores
        let errors= validationResult(req);
        let{email,password,remember}=req.body;
        if(errors.isEmpty()){   

        let usuarioALoguearse;
        users.forEach(user=>{
            if(user.email==email&& bcrypt.compareSync(password,user.password)){
                usuarioALoguearse=user;//el usuario a loguearse es el que encontre
            }
        });
        //pregunto si es indefinido
        if(usuarioALoguearse==undefined){
            return res.send("credenciales No Validas");
        }
        //lo guardo en session 
        req.session.user=usuarioALoguearse;

        if (remember!=undefined){
            //recuerdo la sesion del usuario
            res.cookie("remember",usuarioALoguearse.email, {maxAge:60000});
        }

        return res.redirect("/");

        }else{
            return res.render('users/login',{erorrs:errors.errors})

        }

    },
    profile: function(req, res) {
        return res.render('./users/profile.ejs')
    }
}