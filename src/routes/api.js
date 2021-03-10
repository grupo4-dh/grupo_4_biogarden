// Módulos y controlador
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// API de productos
router.get('/products',apiController.productos);
router.get('/products/:id',apiController.detalle);

// API de usuarios
router.get('/users',apiController.usuarios);
router.get('/users/:id',apiController.usuariosDetalle);

module.exports = router;