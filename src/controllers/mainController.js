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
    carrito:function(req,res){
        db.Producto.findByPk(4,{
          
        })
        .then(function(product){
            return res.render('products/productsCart.ejs',{products:[product],total:10})

        })
        

    },
    processContacto: function (req,res){
      db.Contact.create({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
                                  
    })
      .then((result) => {
        return res.redirect('/');
    })
    .catch((error) => {
        res.send(error)
    })
},

   // processContacto:function(req,res){
     //   let contacto = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/contacto.json'),'utf8'))
       // let nuevoContacto = {
            //guardo la BBDD del usuario
         //   name: req.body.name,
           // email: req.body.email,
            //omentario: req.body.comentario,
        //}
        //console.log(nuevoContacto);
       // contacto.push(nuevoContacto);
        //fs.writeFileSync(path.join(__dirname,'../database/contacto.json'), JSON.stringify(contacto,null,4));
        //res.redirect('/')
    //},
    test: function(req, res){
       res.send('For testing')
    }
}


