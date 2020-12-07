const fs = require('fs')
const path = require('path')

// Usamos archivos JSON como base de datos momentáneamente
// Los leemos (fs.readFileSync) y parseamos (JSON.parse) en una sola linea
let products = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/products.json'),'utf8'));
let productsCart = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/cart.json'),'utf8'));

let ultimoId = 0;
for ( let i = 0; i < products.length; i++ ) {
    if ( ultimoId < products[i].id ) {
        ultimoId = products[i].id
    }
}

module.exports = {
    // Listado de productos
    all: function(req, res) {
        return res.render('./products/productsList.ejs', { products: products } )
    },
    // Vista de creación de producto 
    create: function(req, res) {
        return res.render('./products/productCreate.ejs')
    },
    // Acción de creación de producto 
    save: function(req, res) {
        // Creamos el objeto literal y lo guardamos en el array de products
        let nuevoProducto = {
            id: ultimoId + 1,
            name: req.body.titulo,
            description: req.body.color,
            image: req.file.filename,
            category: req.body.categoria,
            price: req.body.precio,
            quantity: 10,
            colors: req.body.color
        }
        products.push( nuevoProducto );
        
        //Escribimos el producto nuevo
        fs.writeFileSync( path.join( __dirname, '../database/products.json' ), JSON.stringify( products, null, 4 ) );
        
        // Redirigimos a la siguiente página
        res.redirect( '/' )
    },
    // Detalle de producto
    detail: function(req, res) {
        for (product of products) {
            if (product.id == req.params.product_id) {
                return res.render('./products/productDetail.ejs', { product: product })
            }         
        }
        return res.send('PRODUCT NOT FOUND')
    },
    // Vista de edición de producto 
    edit: function(req, res) {
        return res.render('./products/productEdit.ejs')
    },
    // Acción de edición de productos
    update: function(req, res) {
        // TBD
    },
    // Acción de borrado de productos
    delete: function(req, res) {
        // TBD
    },
    // Vista de carrito de compras
    cart: function(req, res) {
        let total = 0;
        for (product of productsCart) {
            total += product.price
        }
        return res.render('./products/productsCart.ejs', { products: productsCart, total: total } )
    }
}