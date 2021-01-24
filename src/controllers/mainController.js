const fs = require('fs');
const path = require('path')

const db = require('../database/models')

module.exports = {
    index: function(req, res) {
        db.Producto.findAll({
            where: {
                status: 1
            }
        })
        .then((products) => {
            return res.render('index', { products: products.slice(0, 12), busquedaUsuario: 'Busqueda' } )
        })
        .catch((error) => {
            return res.send(error)
        });
    },
    quienesSomos: function(req,res) {
        return res.render('quienesSomos.ejs');
    },
    comoComprar: function(req,res) {
        return res.render('comoComprar.ejs');
    },

    contacto:function(req,res){
        return res.render('contacto.ejs');
    },
    processContacto:function(req,res){
        let contacto = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/contacto.json'),'utf8'))
        let nuevoContacto = {
            //guardo la BBDD del usuario
            name: req.body.name,
            email: req.body.email,
            comentario: req.body.comentario,
        }
        console.log(nuevoContacto);
        contacto.push(nuevoContacto);
        fs.writeFileSync(path.join(__dirname,'../database/contacto.json'), JSON.stringify(contacto,null,4));
        res.redirect('/')
    },
    test: function(req, res){
       res.send('For testing')
    }
}

