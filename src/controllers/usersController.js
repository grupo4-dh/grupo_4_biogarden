// Users Controller

// Módulos
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Database
const db = require('../database/models');

module.exports = {
    
    // Users register
    register: function(req, res) {
        return res.render('users/register')
    },
    save: function(req, res){
        // Validamos los datos del form
        let errors = validationResult(req);                                 
        if(! errors.isEmpty()) {                                                // Si hay errores, cargamos la vista anterior con los errores 
            return res.render('users/register', { errors: errors.mapped() })    // mapped() devuelve un objeto con los nombres de los campos y sus errores de validación
        } else {
            // Subimos el archivo al disco
            req.file.filename = req.body.email + path.extname(req.file.originalname);
            fs.writeFileSync(path.join(__dirname,'../../public/uploads/avatars', req.file.filename), req.file.buffer, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 
            
            db.Users.create({
                name: req.body.name,
                lastname: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,12),    // Contrasena hasheada
                id_category: 1,
                avatar: req.file.filename,                          // Si es un solo archivo file
            })
            .then((result) => {
                return res.redirect('/users/login');
            })
            .catch((error) => {
                res.send(error)
            })
        }        
    },

    // Users login
    login: function(req, res) {
        return res.render('users/login.ejs');
    },
    processLogin:function(req, res){
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/login', { erorrs: errors.mapped() })
        } else{
            let { email, password, remember } = req.body;
            let userToLogin;
            db.Users.findOne({
                where: {
                    email: email
                }
            })
            .then(function(user) {
                if (bcrypt.compareSync(password, user.password)) {
                    userToLogin = user
                    delete userToLogin.password
                    req.session.usuarioLogueado = userToLogin;
                                        
                    if (remember != undefined) {
                        res.cookie("remember",usuarioALoguearse.email, {maxAge:60000});
                    }
                    return res.redirect("/");
                }
            })
            .catch((error) => {
                return res.render("users/login", { errors: [{ msg: "Credenciales no válidas" }] })
            });
        }
    },
    processLogout: function(req, res) {
        req.session.destroy();
        res.cookie("remember", "" , {maxAge:-1});   // Elimino la cookie
        res.redirect("/");
    },
    
    // Users profile
    profile: function(req, res) {
        return res.render('users/profile');
    },
}




