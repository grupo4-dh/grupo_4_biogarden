const fs = require('fs')
const path = require('path')

let products = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/products.json'),'utf8'))

module.exports = {
    detail: function(req,res){
        for (let i=0; i < products.length; i++){
            if (products[i].id == req.params.product_id) {
                return res.render('./product/productDetail.ejs', { product: products[i]})
            }         
        }
        
        let product = req.params.product_id
    }
}