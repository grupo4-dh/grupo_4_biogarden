const express = require('express')
const router = express.Router()

const productsController = require('../controllers/productsController')

// LISTADO
//router.get('/list', productsController.list)

// DETALLE
router.get('/detalle/:product_id', productsController.detail)

// CART
//router.get('/cart', productsController.index)


module.exports = router;