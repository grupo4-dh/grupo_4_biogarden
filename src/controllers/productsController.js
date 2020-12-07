const fs = require('fs')
const path = require('path')

// Usamos archivos JSON como base de datos momentáneamente
// Los leemos (fs.readFileSync) y parseamos (JSON.parse) en una sola linea
let products = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/products.json'),'utf8'));
let productsCart = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/cart.json'),'utf8'));

let ultimoId = products.length;

module.exports = { 
    // Devuelve la vista del Listado de productos
    all: function(req, res) {
        return res.render('./products/productsList', { products: products })
    },
    // Devuelve la vista del Formulario de creación de producto 
    create: function(req, res) {
        return res.render('./products/productCreate')
    },
    // Guarda el producto que viaja en el body en la BBDD 
    save: function(req, res) {
        // Creamos el objeto literal y lo guardamos en el array de products
        let nuevoProducto = {
            id: ultimoId + 1,
            name: req.body.titulo,
            description: req.body.color,
            producto: req.file.filename,
            category: req.body.categoria,
            price: req.body.precio,
            quantity: 10,
            colors: req.body.color
        }
        products.push(nuevoProducto);
        
        //Escribimos el producto nuevo
        fs.writeFileSync(path.join( __dirname, '../database/products.json'), JSON.stringify(products, null, 4));
        
        // Redirigimos a la siguiente página
        res.redirect('/')
    },
    // Devuelve la vista del Carrito de compras
    cart: function(req, res) {
        let total = 0;
        for (product of productsCart) {
            total += product.price
        }
        return res.render('./products/productsCart', { products: productsCart, total: total } )
    },
    // Devuelve la vista de Detalle de producto
    detail: function(req, res) {
        for (product of products) {
            if (product.id == req.params.product_id) {
                return res.render('./products/productDetail', { product: product })
            }         
        }
        return res.send('PRODUCT NOT FOUND') // REDIGIR A LISTADO DE PRODUCTOS CON PARTIAL NOT FOUND
    },
    // Devuelve la vista de Edición de producto 
    edit: function(req, res) {
        return res.render('./products/productEdit')
    },
    // Actualiza un producto en la BBDD
    update: function(req, res) {
        let editarProducto = {
            id: ultimoId + 1,
            name: req.body.titulo,
            description: req.body.color,
            image: req.file.filename,
            category: req.body.categoria,
            price: req.body.precio,
            quantity: 10,
            colors: req.body.color
        }
        products.push(editarProducto);
        
        //Escribimos el producto nuevo
        fs.writeFileSync(path.join(__dirname, '../database/products.json'), JSON.stringify(products, null, 4));
        
        // Redirigimos a la siguiente página home
        res.redirect('/')
    },
    // Borra un producto de la BBDD
    delete: function(req, res) {
        products = products.filter( prod => prod.id != req.params.product_id )
        fs.writeFileSync(path.join(__dirname,'../database/products.json'),JSON.stringify(products, null, 4));
        res.redirect('/products')
    }
}