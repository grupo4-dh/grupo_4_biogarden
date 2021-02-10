// productCreateValidator valida los datos del Form de Creación de productos

const path = require('path')
const { check, body } = require('express-validator');

const db = require('../database/models')

module.exports = [
    check("title")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isLength({ min: 5, max: 45 }).withMessage('El nombre tiene que tener como mínimo 5 caracteres'),

    check("description")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isLength({ min: 20, max: 200 }).withMessage('La descripción tiene que tener como mínimo 20 caracteres'),

    check("image")
    .custom( (value, {req}) => { 
        if (! req.file ) {
            throw new Error ("Tienes que cargar una imagen del producto")
        }
        let extension = (path.extname(req.file.originalname)).toLowerCase();
        if (!['.jpg', '.jpeg', '.png', '.gif'].includes(extension)) {
            throw new Error ("El formato de imagen no es válido")
        } else {
            return true
        }
    }),

    check("price")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isNumeric().withMessage('El precio debe ser un número'),

    check("quantity")
    .notEmpty().withMessage('El campo no puede estar vacío')
    .isNumeric().withMessage('La cantidad debe ser un número')
    .custom( (value) => { 
        if (value <= 0) {
            throw new Error ("La cantidad no puede ser menor a 0")
        } else {
            return true
        }
    }),

    check("id_category")
    .custom( (value) => { 
        if (value == "Elegir categoría") {
            throw new Error ("Tienes que elegir una categoría")
        } else {
            return true
        }
    }),

    check("id_colour")
    .custom( (value) => { 
        if (value == "Elegir color") {
            throw new Error ("Tienes que elegir un color o no aplica")
        } else {
            return true
        }
    }),

    check("id_size")
    .custom( (value) => { 
        if (value == "Elegir tamaño") {
            throw new Error ("Tienes que elegir un tamaño o no aplica")
        } else {
            return true
        }
    })
]