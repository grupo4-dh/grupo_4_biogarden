// Users Controller

// Módulos
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Database
const db = require('../database/models/index');

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
           
            db.Users.findOne({//hago consulta a la BBDD
                where: { email: email },
                include: { all: true }
            })
            .then(function(user) {//user es la variable que guarda lo que recupero de la promesa
                if (!user) {
                    return res.render("users/login", { errors: { error: { msg: "Credenciales no válidas" } } })
                } else if (!bcrypt.compareSync(password, user.password)) {
                    return res.render("users/login", { errors: { error: { msg: "Credenciales no válidas" } } })
                } else {
                    delete user.password
                    req.session.usuarioLogueado = user;//lo guardo en la session
                                        
                    if (remember != undefined) {
                        res.cookie("remember",user.email, {maxAge:1000*60*60});
                    }
                    return res.redirect("/");
                }
            })
            .catch((error) => {
                console.log('3')
                return res.render("users/login", { errors: { error: { msg: error } } })
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
    edit: function(req, res) {
        return res.render('users/edit');
    },
    udpate: function(req, res) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/edit', { erorrs: errors.mapped() })
        } else{
            // Subimos el archivo al disco
            if (req.file) {
                req.file.filename = req.body.email + path.extname(req.file.originalname);
                fs.writeFileSync(path.join(__dirname,'../../public/uploads/avatars', req.file.filename), req.file.buffer, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                }); 
            }
            
            db.Users.update({
                name: req.body.name,
                lastname: req.body.last_name,
                email: req.body.email,
                avatar: (req.file ? req.file.filename : req.session.usuarioLogueado.avatar),
            },{
                where: {
                    id: req.session.usuarioLogueado.id
                }
            })
            .then(function(user) {
                req.session.usuarioLogueado.name = req.body.name;
                req.session.usuarioLogueado.lastname = req.body.lastname;
                req.session.usuarioLogueado.email = req.body.email;
                req.session.usuarioLogueado.avatar = (req.file ? req.file.filename : req.session.usuarioLogueado.avatar);
                                    
                if (req.cookies.remember != undefined) {
                    res.cookie.remember = req.body.email;
                }
                return res.redirect("/");
            })
            .catch((error) => {
                return res.render("users/login", { errors: [{ msg: "Credenciales no válidas" }] })
            });
        }
    },
}