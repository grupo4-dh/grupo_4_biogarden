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
            },
            include:[
                {association:"colores"},{association:"tamanos"},{association:"categorias"},{association:"ordenes"}]
        })
        .then(function(products) {
            return res.render('products/productsList', { products: products }); //recibe la ruta y el array
        })
        .catch((error) => {
            return res.send(error)
        });
    },

    search:function(req,resp){//faltaria hacer la vista de search resoult// req.query.search(lo que el usuario busca)
        db.Producto.findAll({
            where:{
                title:{
                    [db.Sequelize.Op.like]:`%${req.query.search}%`//loq ue el usuario busca
                }
            }
        })
        .then(function(resultado){
            res.render('products/searchResoult',{
                queryString:req.query.search,
                productos:resultado//recuperamos lo que el usuario busca
            })
        })
            .catch(function(e){
                console.log(e)
            
        })

    },
    // Devuelve la vista de Detalle de producto segun el id 
    detail: function(req, res) {
        db.Producto.findByPk(req.params.id,{
            include:[{association:"colores"},{association:"tamanos"},{association:"categorias"},{association:"ordenes"}]
                
  
        })
        .then(function(product) {
            return res.render('products/productDetail', { product: product })
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
       
      res.redirect('products/productsList');
    },
    // Devuelve la vista del Carrito de compras
    cart: function(req, res) {
        let total = 0;
        for (product of productsCart) {
            total += product.price
        }
        return res.render('products/productsCart', { products: productsCart, total: total } )
    },
    
    // Devuelve la vista de Edición de producto segun el ID
    edit: function(req, res){// esta mal porque da error el codigo--- REVISARLO!!!

        db.Producto.findByPk(req.params.id,{ include: { all: true }})
     
            .then(function(producto){
                db.Psize.findAll()
                .then(function(sizes){
                    db.Pcategoria.findAll()
                    .then(function(categorias){
                        db.Pcolour.findAll()
                        .then(function(colores){
                            res.render('products/productEdit', {
                                producto: producto,
                                sizes:sizes,
                                categorias:categorias,
                                colores:colores
                             })

                        })
                    })
                })   
            })
            .catch((error) => {
                return res.send(error)  
        });
    
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
        
        res.redirect('products/productsList' + req.params.id)

      
    },
    // eliminar  un producto de la BBDD
    delete: function(req, res) {
        db.Producto.destroy({
            where:{
                id:req.params.id
            }
        })
        res.redirect('products/productList');
        
    }
}