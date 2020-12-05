const fs = require('fs')
const path = require('path')

// Usamos archivos JSON como base de datos momentáneamente
 //Los leemos (fs.readFileSync) y parseamos (JSON.parse) en una sola linea
let products = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/products.json'),'utf8'))
let cart = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/cart.json'),'utf8'))

let ultimoId=0;
for (let i=0; i<cart.length; i++){
    if(ultimoId <cart[i].id){
        ultimoId=cart[i].id
    }
}

module.exports = {
    // Listado de productos
    all: function(req, res) {
        let products = fs.readFileSync(path.join(__dirname, '../database/products.json'), 'utf8');
        let arrayProducts = JSON.parse(products)
        return res.render('./products/productsList.ejs', {productosEnLaVista: arrayProducts})

    },
    // Vista de creación de producto 
    create: function(req, res) {
        return res.render('./products/productCreate.ejs')
    },
    // Acción de creación de producto 
    save: function(req, res) {
// guardar en la base de datos la info de los prodcutos
        let nuevoProducto={
            id: ultimoId + 1,
            titulo:req.body.titulo,
            precio:req.body.precio,
            categoria:req.body.categoria,
            color:req.body.color,
            descripcion:req.body.color,
            producto:req.file.filename,

        }
        cart.push(nuevoProducto);
            //escribimos el producto nuevo
            fs.writeFileSync(path.join(__dirname,'../database/products.json'), JSON.stringify(cart,null,4));
            
            res.redirect('/')

    },
    // Detalle de producto
    detail: function(req, res) {
        for (product of products) {
            if (product.id == req.params.product_id) {
                return res.render('./products/productDetail.ejs', { product: product })
            }         
        }
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
    cart: function(req, res) {
        return res.render('./products/productsCart.ejs')
    }
}