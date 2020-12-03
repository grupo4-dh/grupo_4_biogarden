// ENRUTADOR PRODUCTS

const express = require('express')
const router = express.Router()

const productsController = require('../controllers/productsController')

// Products list
router.get('/', productsController.all)

// Products cart
router.get('/cart', productsController.cart)

// Product detail
router.get('/detail/:product_id', productsController.detail)

// Products create
router.get('/create', productsController.create)

// Products edit
router.get('/edit/:product_id', productsController.edit)

module.exports = router;