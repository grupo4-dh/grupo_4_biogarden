// ENRUTADOR PRODUCTS

const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const productsController = require('../controllers/productsController')

// Configuramos multer en la variable upload para subida de archivos
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/uploads/productos'))
    },
    filename: function (req, file, cb) {
      cb(null, req.body.email + '-' + path.extname(file.originalname))//recordar lo de la extension
    }
  })
   
var upload = multer({ storage: storage })

//  --- RUTAS --- 
//  Listado de productos
//  GET '/' | Vista
router.get('/', productsController.all)

//  Creación de productos
//  GET '/create' -> Formulario de creación de productos
//  POST '/create' -> Acción de creación de producto
router.get('/create', productsController.create)
router.post('/create',upload.single('producto'), productsController.save)

//  Carrito de compras
//  GET '/cart' -> Vista
router.get('/cart', productsController.cart)

//  Detalle de producto
//  GET '/:product_id' -> Detalle de producto
router.get('/:product_id', productsController.detail)

//  Edición y borrado de producto
//  GET '/:product_id/edit' -> Formulario de edición de productos
//  PUT '/:product_id' -> Acción de edición de producto
//  DELETE '/:product_id' -> Acción de borrado de producto
router.get('/:product_id/edit', productsController.edit)
router.put('/:product_id', productsController.update)
router.delete('/:product_id', productsController.delete)

module.exports = router; 