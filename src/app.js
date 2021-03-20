// Modules
const path = require('path');
const cors = require('cors');

// Express
const express = require('express');
const app = express();
const bodyParser=require ('body-parser');

// Session & Cookies
const session = require('express-session');
const cookieParser= require("cookie-parser");

// Middlewares de cookies
const rememberMiddleware = require("./middlewares/rememberMiddleware");
const usuarioRender = require('./middlewares/usuarioRender');

// Configuramos el entorno para poder capturar los datos que viajan via formulario y los transformamos
// en un objeto literal
app.use(bodyParser.json());//DEPENDENCIAS DE LAS API PARA POST
app.use(express.urlencoded({extended : true}))
app.use(express.json())

// Configuramos el motor de vistas y la carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Usamos methodOverride para poder implementar los métodos PUT y DELETE
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// Seteamos la carpeta public con contenido estático
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors())

// Seteamos session
app.use(session({ secret:'secret' }));
app.use(cookieParser());
app.use(rememberMiddleware);
app.use(usuarioRender);

// Routers
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const apiRouter = require('./routes/api');

// Route
app.use('/', mainRouter);
app.use('/carrito',mainRouter);
app.use('/users', usersRouter); 
app.use('/products', productsRouter); 
app.use('/api',apiRouter);

// Levantamos el server en el puerto indicado en la variable de entorno PORT, o en el puerto 3000 si no hay nada ahí.
// Más info en: https://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js
app.listen(process.env.PORT || 3000,function() {
    console.log("Server running...")
    console.log("http://localhost:3000/")
})