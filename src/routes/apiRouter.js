// Módulos y controlador
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

//RUTAS DE PRODUCTOS

router.get('/products',apiController.listado);
router.get('/products',apiController.categoria);

//  Detalle de producto
router.get('/products/:id', productsController.detalle); 

//creacion, edicion y borrado de productos
router.post('/create', notasController.create);
router.put('/edit/:id',notasController.update);
router.delete('/delete/:id',notasController.delete)

module.exports = router;