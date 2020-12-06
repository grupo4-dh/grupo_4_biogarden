const fs = require('fs')
const path = require('path')

// Usamos archivos JSON como base de datos momentáneamente
// Los leemos (fs.readFileSync) y parseamos (JSON.parse) en una sola linea
let products = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/products.json'),'utf8'))

module.exports = {
    index: function(req, res) {
        return res.render('index.ejs', { products: products.slice(0, 12) } )
    }
}