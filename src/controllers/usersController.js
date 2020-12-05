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
        console.log(req);
        if(errors.isEmpty()){
            //si no hay errores continuamos
            let nuevoUsuario={
            //guardo la BBDD del usuario
            id:ultimoId +1,
            name:req.body.name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,12),//contrasena hasheada
            avatar:req.file.filename,//si es un solo archivo file

            }
            users.push(nuevoUsuario);
            //escribimos el usuario
            fs.writeFileSync(path.join(__dirname,'../database/users.json'), JSON.stringify(users,null,4));
            
            res.redirect('./users/login.ejs')
        }else{
            //si hay errores sigo por aca
            return res.render('users/register',{
                errors:errors.mapped()})
        }        
    },
    login: function(req, res) {
        return res.render('./users/login.ejs');
    },
    processLogin:function(req,res){
        let errors= validationResult(req);
        console.log(req);
        if(errors.isEmpty()){
            let usersJson = fs.readFileSync(path.join(__dirname,'../database/users.json',{encoding:'utf8'}));
        let users;
        if(usersJson==''){
            users=[];
        }else{
            users=JSON.parse(usersJson);
        }
//recorro los emails  y la contrasena para verificar la sesion
        for(let i=0; i<users.length;i++){
            if(users[i].email==req.body.email){
                if(bcrypt.compareSync(req.body.password,users[i].password)){
                    let usuarioALoguearse=users[i];
                    break;

                }

            }
        }
        
        if (usuarioALoguearse==undefined){
            return res.render('login',{errors:[
                {msg:'Credenciales invalidas'}
            ]})
        }

        req.session.usuarioLogueado=usuarioALoguearse;


        }else{
            return res.render('users/login',{erorrs:errors.errors})

        }


    },
    profile: function(req, res) {
        return res.render('./users/profile.ejs')
    }
}