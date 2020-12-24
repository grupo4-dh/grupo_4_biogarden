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
    if(ultimoId <users[i].id){//buscoe l ultimo Id creado y el nuevo usuario se incrementa el id
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
            
            res.redirect('/users/login')
        }else{
            //si hay errores sigo por aca
            return res.render('users/register',{errors:errors.mapped()})//filtra y mapea el array y devuelve un objeto
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
        for (let i=0; i<users.length;i++){
            if(users[i].email==email&& bcrypt.compareSync(password,users[i].password)){
                usuarioALoguearse=users[i];//el usuario a loguearse es el que encontre
                
            }
        };
        //pregunto si es indefinido
        if(usuarioALoguearse==undefined){
            return res.render("users/login",{errors:[{msg:"credenciales No Validas"}]});
           
        }
        //lo guardo en session //usuario lOgueado es el nombre que hayq ue darle  generico
        req.session.usuarioLogueado=usuarioALoguearse;

        //reviso si tildo en el formulario remember

        if (remember!=undefined){
            //hago al cookie  con un tiempo limitado y se hizo a nivel global. para cualquier pagina funciona
            res.cookie("remember",usuarioALoguearse.email, {maxAge:60000});
        }

        //se renderiza  a la home

        return res.redirect("/");

        }else{
            return res.render('users/login',{erorrs:errors.mapped()})
       

        }


    },
    
    profile: function(req, res) {
        return res.render('users/profile');
    }
}