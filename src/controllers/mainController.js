const fs = require('fs')
const path = require('path')

// Usamos archivos JSON como base de datos momentáneamente
// Los leemos (fs.readFileSync) y parseamos (JSON.parse) en una sola linea
let products = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/products.json'),'utf8'))
let contacto = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/contacto.json'),'utf8'))

module.exports = {
    index: function(req, res) {
        return res.render('index.ejs', { products: products.slice(0, 12) } )
    },
    contacto:function(req,res){
        return res.render('contacto.ejs');
    },
    processContacto:function(req,res){
        let nuevoContacto={
            //guardo la BBDD del usuario
            name: req.body.name,
            email:req.body.email,
            comentario:req.body.comentario,

            }
            contacto.push(nuevoContacto);
           
            fs.writeFileSync(path.join(__dirname,'../database/contacto.json'), JSON.stringify(contacto,null,4));
            
            res.redirect('/')
        
    }

}

