const fs = require('fs')
const path = require('path')
const db = require("../database/models")


// Usamos archivos JSON como base de datos momentáneamente
// Los leemos (fs.readFileSync) y parseamos (JSON.parse) en una sola linea
//let products = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/products.json'),'utf8'));
//let productsCart = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/cart.json'),'utf8'));

//let ultimoId=0;
//for (let i=0; i<products.length; i++) {
    //if(ultimoId <products[i].id) {
        //ultimoId=products[i].id
    //}
//}


module.exports = { 
    // Devuelve la vista del Listado de productos
    all: function(req, res) {
        db.Producto.findAll({
            where: {
                status: 1
            }
        })
        .then(function(products) {
            return res.render('productsList', { products: products }); //recibe la ruta y el array
        })
        .catch((error) => {
            return res.send(error)
        });
    },

    search:function(req,resp){//faltaria hacer la vista de search resoult
        db.Producto.findAll({
            where:{
                title:{
                    [db.Sequelize.Op.like]:`%${req.query.search}%`
                }
            }
        })
        .then(function(resultado){
            res.render('searchResoult',{
                queryString:req.query.search,
                productos:resultado
            })
        })

    },
    // Devuelve la vista de Detalle de producto segun el id 
    detail: function(req, res) {
        db.Producto.findByPk(req.params.id,{
            include:[{association:"colores"},{association:"tamanos"},{association:"categorias"},{association:"ordenes"}]
                
  
        })
        .then(function(product) {
            return res.render('productDetail', { product: product })
        })
        .catch((error) => {
            return res.send(error)
        });
    },
    // Devuelve la vista del Formulario de creación de producto 
    create: function(req, res) {
        return res.render('productCreate')
    },
    // Guarda el producto que viaja en el body en la BBDD 
    save: function(req, res) {
        db.Producto.create({
            title:req.body.title,
            price:req.body.price,
            image:req.body.image,
            description:req.body.descripcion,
            id_category:req.body.id_category,
            id_colour:req.body.id_colour,
            id_size:req.body.id_size,
            quantity:req.body.quantity

        })
       
      res.redirect('productsList');
    },
    // Devuelve la vista del Carrito de compras
    cart: function(req, res) {
        let total = 0;
        for (product of productsCart) {
            total += product.price
        }
        return res.render('productsCart', { products: productsCart, total: total } )
    },
    
    // Devuelve la vista de Edición de producto segun el ID
    edit: function(req, res) {
        db.Producto.findByPK(req.prams.id,{
            include:[{association:"colores"},{association:"tamanos"},{association:"categorias"},{association:"ordenes"}]
        })
        .then(function(elProducto){
            res.render('productEdit',{elProducto:elProducto})
        })

       
    },
    // Actualiza un producto en la BBDD
    update: function(req, res) {
        db.Producto.update({
            title:req.body.title,
            price:req.body.price,
            image:req.body.image,
            description:req.body.descripcion,
            id_category:req.body.id_category,
            id_colour:req.body.id_colour,
            id_size:req.body.id_size,
            quantity:req.body.quantity

        },{
            where:{
                id:req.params.id
            }
        });
        
        res.redirect('productsList' + req.params.id)

      
    },
    // eliminar  un producto de la BBDD
    delete: function(req, res) {
        db.Producto.destroy({
            where:{
                id:req.params.id
            }
        })
        res.redirect('productList');
        
    }
}