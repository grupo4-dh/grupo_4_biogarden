// Librerias
const path = require('path');

// Express
const express = require('express');
const app = express();

// Session
const session = require('express-session');

// Routers
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

// Configuramos el motor de vistas y la carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Usamos methodOverride para poder implementar los métodos PUT y DELETE
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// Seteamos la carpeta public con contenido estático
app.use(express.static(path.join(__dirname, '../public')));

// Configuramos el entorno para poder capturar los datos que viajan via formulario y los transformamos
// en un objeto literal
app.use(express.urlencoded({extended : false}))
app.use(express.json())

// Seteamos session
app.use(session({secret:'secret'}));

// Seteamos los routers
app.use( '/', mainRouter );
app.use( '/users', usersRouter ); 
app.use( '/products', productsRouter ); 

// Levantamos el server en el puerto indicado en la variable de entorno PORT, o en el puerto 3000 si no hay nada ahí.
// Más info en: https://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js
app.listen(process.env.PORT || 3000,function() {
    console.log("Server running...")
    console.log("http://localhost:3000/")
})