// ENRUTADOR PRODUCTS

const express = require('express')
const router = express.Router()
const multer =require('multer');
const path=require('path');
const productsController = require('../controllers/productsController')
//para uploads de imagenes
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/uploads/productos'))
    },
    filename: function (req, file, cb) {
      cb(null, req.body.email + '-' + path.extname(file.originalname))//recordar lo de la extension
    }
  })
   
  var upload = multer({ storage: storage })


// Listado de producto del usuario
router.get('/', productsController.all)

// Vista de creación de productos
router.get('/create', productsController.create)

// Acción de creación de productos
router.post('/create',upload.single('producto'), productsController.save)


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