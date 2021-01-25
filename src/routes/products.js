// ENRUTADOR PRODUCTS

// Módulos y controlador
const express = require('express')
const multer = require('multer');
const path = require('path');
const productsController = require('../controllers/productsController')

const adminMiddleware = require('../middlewares/adminMiddleware');

// Creamos el router
const router = express.Router()

// Configuramos multer en la variable upload para subida de archivos
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../../public/uploads/productos'))
    },
    filename: function (req, file, cb) {
        cb(null, 'product_' + Date.now() + path.extname(file.originalname))             // Recordar lo de la extensión
    }
})
var upload = multer({ storage: storage })

//  --- RUTAS --- 
//  Listado de productos
router.get('/', productsController.all);                    // Vista del Listado de productos

//Busqueda de productos desde el header
router.get('/search',productsController.search);

//  Creación de productos
router.get('/create', adminMiddleware, productsController.create);            // Formulario de creación de productos
router.post('/create', upload.single('imagen'), productsController.save);              // Acción de creación de producto

//  Carrito de compras-----SOLO RENDERIZA LA VISTA , HAY QUE MEJORARLA
router.get('/cart', productsController.cart);               // Vista del Carrito de compras

//  Detalle de producto
router.get('/:id', productsController.detail);       // Vista del Detalle de producto

//  Edición y borrado de producto
router.get('/:id/edit', adminMiddleware, productsController.edit);    // Vista del Formulario de edición de productos
router.post('/:id/edit', upload.single('producto'), productsController.update);        // Acción de edición de producto
router.post('/:id/delete', productsController.delete);    // Acción de borrado de producto

module.exports = router; 