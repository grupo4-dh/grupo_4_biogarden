// ENRUTADOR PRODUCTS

const express = require('express')
const router = express.Router()

const productsController = require('../controllers/productsController')

// Listado de producto
router.get('/', productsController.all)

// Vista de creación de productos
router.get('/create', productsController.create)

// Acción de creación de productos
router.post('/', productsController.save)

// Detalle de producto
router.get('/:product_id', productsController.detail)

// Vista de edición de producto
router.get('/:product_id/edit', productsController.edit)

// Acción de edición de productos
router.put('/:product_id', productsController.update)

// Acción de edición de productos
router.delete('/:product_id', productsController.delete)

// Carrito de compras
router.get('/cart', productsController.cart)

module.exports = router; 