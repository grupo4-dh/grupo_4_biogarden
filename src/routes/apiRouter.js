// Módulos y controlador
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

//RUTAS DE PRODUCTOS

router.get('/products',apiController.productos);


//  Detalle de producto
router.get('/products/:id',apiController.detalle); 

//creacion, edicion y borrado de productos
//router.post('/create', apiController.create);
//router.put('/edit/:id',apiController.update);
//router.delete('/delete/:id',apiController.delete)

module.exports = router;