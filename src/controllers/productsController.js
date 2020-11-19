const fs = require('fs')
const path = require('path')

// Usamos archivos JSON como base de datos momentáneamente
// Los leemos (fs.readFileSync) y parseamos (JSON.parse) en una sola linea
let products = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/products.json'),'utf8'))
let cart = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/cart.json'),'utf8'))

module.exports = {
    all: function(req, res) {
        res.render('./products/productCreate.ejs')
        //return res.render('./products/productsList.ejs', { product: product })
    },
    detail: function(req, res) {
        for (product of products) {
            if (product.id == req.params.product_id) {
                return res.render('./products/productDetail.ejs', { product: product })
            }         
        }
    },
    cart: function(req, res) {
        return res.render('./products/productsCart.ejs', { product: product })
    }
}