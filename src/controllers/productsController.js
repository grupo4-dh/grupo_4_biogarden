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
            return res.render('./products/productsList', { products: products }); //recibe la ruta y el array
        })
        .catch((error) => {
            return res.send(error)
        });
    },
    // Devuelve la vista de Detalle de producto segun el id 
    detail: function(req, res) {
        db.Producto.findByPk(req.params.id,{
            include:{
                all:true,
                nested:true
            }
        })
        .then(function(product) {
            return res.render('./products/productDetail', { product: product })
        })
        .catch((error) => {
            return res.send(error)
        });
    },
    // Devuelve la vista del Formulario de creación de producto 
    create: function(req, res) {
        return res.render('./products/productCreate')
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
        return res.render('./products/productsCart', { products: productsCart, total: total } )
    },
    
    // Devuelve la vista de Edición de producto 
    edit: function(req, res) {
        for (product of products) {
            if (product.id == req.params.product_id) {
                return res.render('./products/productEdit', { products: product })
            }         
        }
        return res.send('PRODUCT NOT FOUND') // REDIGIR A LISTADO DE PRODUCTOS CON PARTIAL NOT FOUND
    },
    // Actualiza un producto en la BBDD
    update: function(req, res) {
        for (product of products) {
            if (product.id == req.params.product_id) {
                product.name = req.body.titulo,
                product.description = req.body.descripcion,
                product.image = req.file.filename,
                product.category = req.body.categoria,
                product.price = parseInt(req.body.precio),
                product.colors = req.body.color 
            }
        }

        //Escribimos el producto nuevo
        fs.writeFileSync(path.join(__dirname,'../database/products.json'),JSON.stringify(products, null, 4));

        // Redirigimos a la siguiente página home
        res.redirect('/products')
    },
    // Borra un producto de la BBDD
    delete: function(req, res) {
        products = products.filter( prod => prod.id != req.params.product_id )
        fs.writeFileSync(path.join(__dirname,'../database/products.json'),JSON.stringify(products, null, 4));
        res.redirect('/products')
    }
}