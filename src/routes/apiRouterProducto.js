// Módulos y controlador
const express = require('express');
const router = express.Router();
const apiControllerProducto = require('../controllers/apiControllerProducto');

//RUTAS DE PRODUCTOS

router.get('/products',apiControllerProducto.productos);


//  Detalle de producto
router.get('/products/:id',apiControllerProducto.detalle); 

//USUARIOS
router.get('/users',apiControllerProducto.usuarios);
router.get('/users/:id',apiControllerProducto.usuariosDetalle);

//creacion, edicion y borrado de productos
//router.post('/create', apiController.create);
//router.put('/edit/:id',apiController.update);
//router.delete('/delete/:id',apiController.delete)



module.exports = router;