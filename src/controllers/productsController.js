const fs = require('fs')
const path = require('path')
const db = require("../database/models")
const { validationResult } = require('express-validator');

module.exports = { 
    // Devuelve la vista del Listado de productos
    all: function(req, res) {
        db.Producto.findAll({//podemos agregar que ordene por producto de creacion con orderby
            where: {
                status: 1
            },
            include: { all: true }
        })
        .then(function(products) {
            if (req.session.usuarioLogueado && req.session.usuarioLogueado.user_category.id == 2) {
                let page = 1;
                let total = products.length;
                if ( req.query.page == undefined || req.query.page == '1' || isNaN(parseInt(req.query.page)) ) {
                // Cuando no se indica página, se indica pero no es un número o se indica y es 1, mostramos los primeros 10 elementos
                    products = products.slice(0,10)
                } else {
                // Cuando la página es mayor a 1, mostramos los productos de esa página
                // Página 2: productos del 11 al 20, Página 3: productos del 21 al 30
                    page = parseInt(req.query.page)
                    if (products.length > (page * 10)) {
                        products = products.slice(((page - 1) * 10 ), (page * 10))
                    } else {
                        products = products.slice(((page - 1) * 10 ), products.length)
                    }
                }
                return res.render('products/productsListAdmin', { products: products, page: page, total: total }); //recibe la ruta y el array
            } else {
                return res.render('products/productsList', { products: products }); //recibe la ruta y el array
            }
        })
        .catch((error) => {
            return res.send(error)
        });
    },

    search:function(req,res){//faltaria hacer la vista de search resoult// req.query.search(lo que el usuario busca)
        db.Producto.findAll({
            where:{
                title:{
                    [db.Sequelize.Op.like]:`%${req.query.search}%`//loq ue el usuario busca
                }
            }
        })
        .then(function(resultado){
            res.render('products/searchResoult',{
                queryString:req.query.search,
                productos:resultado//recuperamos lo que el usuario busca
            })
        })
            .catch(function(e){
                console.log(e)
            
        })

    },
    // Devuelve la vista de Detalle de producto segun el id 
    detail: function(req, res) {
        db.Producto.findByPk(req.params.id,{
            include: { all: true }//incluir las asociaciones
        })
        .then(function(product) {
            return res.render('products/productDetail', { product: product })
        })
        .catch((error) => {
            return res.send(error)
        });
    },
    // Devuelve la vista del Formulario de creación de producto 
    create: function(req, res) {
        db.Psize.findAll()
        .then(function(sizes){
            db.Pcategoria.findAll()
            .then(function(categorias){
                db.Pcolour.findAll()
                .then(function(colores) {
                    res.render('products/productCreate', {
                        sizes: sizes,
                        categorias: categorias,
                        colores: colores
                    })
                })
            })
        })   
        .catch((error) => {
            return res.send(error)  
        });
    },
    // Guarda el producto que viaja en el body en la BBDD 
    save: function(req, res) {
        // Validamos los datos del form
        let errors = validationResult(req);                                 
        if(! errors.isEmpty()) {                                                // Si hay errores, cargamos la vista anterior con los errores 
            db.Psize.findAll()
            .then(function(sizes){
                db.Pcategoria.findAll()
                .then(function(categorias){
                    db.Pcolour.findAll()
                    .then(function(colores) {
                        return res.render('products/productCreate', {
                            sizes: sizes,
                            categorias: categorias,
                            colores: colores,
                            errors: errors.mapped()
                        })
                    })
                })
            })
        } else {
            // Subimos el archivo al disco
            req.file.filename = 'product_' + Date.now() + path.extname(req.file.originalname);
            fs.writeFileSync(path.join(__dirname,'../../public/uploads/products', req.file.filename), req.file.buffer, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 
            
            db.Producto.create({
                title: req.body.title,
                price: req.body.price,
                image: req.file.filename,    //asociado al multer
                description: req.body.description,
                id_category: req.body.id_category,
                id_colour: req.body.id_colour,
                id_size: req.body.id_size,
                quantity: req.body.quantity,
                status:1
            })
            .then(function(){
                res.redirect('/products')
    
            })
            .catch((error) => {
                return res.send(error)  
            });
        }
        
        
    },

    // Devuelve la vista del Carrito de compras
    cart: function(req, res) {
        let total = 0;
        for (product of productsCart) {
            total += product.price
        }
        return res.render('products/productsCart')
    },
    
    // Devuelve la vista de Edición de producto segun el ID
    edit: function(req, res){// esta mal porque da error el codigo--- REVISARLO!!!

        db.Producto.findByPk(req.params.id,{ include: { all: true }})
        .then(function(producto){
            console.log(producto)
            db.Psize.findAll()
            .then(function(sizes){
                db.Pcategoria.findAll()
                .then(function(categorias){
                    db.Pcolour.findAll()
                    .then(function(colores){
                        res.render('products/productEdit', {
                            producto: producto,
                            sizes: sizes,
                            categorias: categorias,
                            colores: colores
                        })
                    })
                })
            })   
        })
        .catch((error) => {
            return res.send(error)  
        });
    
    },
    // Actualiza un producto en la BBDD
    update: function(req, res) {
        db.Producto.update({
            title:req.body.title,
            price:req.body.price,
            image:(req.file ? req.file.filename : req.body.image),
            description:req.body.description,
            id_category:req.body.id_category,
            id_colour:req.body.id_colour,
            id_size:req.body.id_size,
            quantity:req.body.quantity,
            status:1

        },
        {
            where:{
                id:req.params.id
            }
        })
        .then(function(){
            res.redirect('/products/'+ req.params.id)

        })  
    },
    // eliminar  un producto de la BBDD
    delete: function(req, res) {
        db.Producto.update({
            status:0
        },
        {
            where:{
                id:req.params.id
            }
        })
        .then(function(){
            res.redirect('/products');

        })
    },

    comments:function(req,res){
        //res.send(req.body.comment)
        
        db.Comment.create({//llamo al modelo comment
            comment: req.body.comment,
            email: req.body.email,
          
        })
       
        .then((result) => {
            return res.redirect('/');
            console.log(result)

        })
        .catch((error) => {
            return res.send(error)  
        });

    }
           
}