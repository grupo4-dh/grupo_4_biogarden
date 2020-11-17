const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/main');

// Configuramos el motor de vistas
app.set('view engine', 'ejs');

// Seteamos la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

// Seteamos la carpeta public
app.use(express.static(path.join(__dirname, '../public')));

const routerMain = require('./routes/main');
const routerProducts = require('./routes/products');

app.use("/", routerMain);
app.use("/productos",routerProducts); 

app.get("/carrito",function(req,res){
    res.sendFile(path.join( __dirname,"/views/productCart.ejs" ))
}) 

app.get("/registro",function(req,res){
    res.sendFile(path.join( __dirname,"/views/register.ejs" ))
}) 

app.get("/login",function(req,res){
    res.sendFile(path.join( __dirname,"/views/login.html" ))
}) 

app.listen(3000,function(){
    console.log("Server running...")
    console.log("http://localhost:3000/")
})