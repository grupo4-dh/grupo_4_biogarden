// ENRUTADOR PRODUCTS

const express = require('express')
const router = express.Router()

const productsController = require('../controllers/productsController')

// Products list
router.get('/', productsController.all)

// Products detail
router.get('/detail/:product_id', productsController.detail)

// Products cart
router.get('/cart', productsController.cart)

module.exports = router;