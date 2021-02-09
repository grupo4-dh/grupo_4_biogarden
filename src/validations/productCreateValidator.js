// productCreateValidator valida los datos del Form de Creación de productos

const { check, body } = require('express-validator');

const db = require('../database/models')

module.exports = [
    check("title")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isLength({ min: 5, max: 45 }).withMessage('El título tiene que tener como mínimo 5 caracteres'),

    check("description")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isLength({ min: 20, max: 200 }).withMessage('La descripción tiene que tener como mínimo 20 caracteres'),

    check("image")
    .notEmpty().withMessage('Tienes que cargar una imagen del producto')
    .custom( () => { 
        let extension = (path.extname(req.file.originalname)).toLowerCase();
        if (!['.jpg', '.jpeg', '.png', '.gif'].includes(extension)) {
            throw new Error ("El formato de imagen no es válido")
        }
    }),
]