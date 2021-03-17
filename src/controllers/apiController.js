// API Controller

// Database
let db = require('../database/models/index');
 
module.exports = {
 
    // Products list
    productos: async function(req,res){
        // Busco todos los productos y los ordeno por ID
        await db.Producto.findAll({
            order: [[ 'id', 'ASC']],
            include: { all: true }
        })
        .then(function(products) {
            db.Pcategoria.findAll()
            .then(function(categories) {
                
                // Response
                let response = {
                    count: 0,
                    countByCategory: {},
                    products: [],
                    paging: {},
                }

                // Total de productos
                let count = products.length
                
                // Cantidad por categoría
                let countByCategory = []
                for (let i = 0; i < categories.length; i++){
                    countByCategory.push({
                        id: categories[i].id,
                        name: categories[i].name,
                        count: products.filter( p => p.id_category == categories[i].id).length
                    })
                }

                // Listado de productos (con paginado: 10 por página)
                let productsJson = []
                let paging = {
                    limit: 10,
                    offset: 0,
                }
                
                // Cuando la página es 'all', mostramos todos los productos
                if (req.query.page === 'all') {
                    for (let i = 0; i < products.length; i++){
                        let product = products[i];
                        product.dataValues.urlImagen = `/uploads/products/${product.dataValues.image}`
                        product.dataValues.detail = `http://${req.headers.host}/api/products/${products[i].id}`
                        delete product.dataValues.image
                        delete product.dataValues.id_category
                        delete product.dataValues.id_size
                        delete product.dataValues.id_colour
                        productsJson.push(product)
                    }
                    paging = null
                } else if ( req.query.page == undefined || req.query.page == '1' || isNaN(parseInt(req.query.page)) ) {
                // Cuando no se indica página, se indica pero no es un número o se indica y es 1, mostramos los primeros 10 elementos
                    if (products.length > 10) {
                        paging.next = `http://${req.headers.host}/api/products?page=2`
                    }
                    products = products.slice(0,10)
                    for (let i = 0; i < products.length; i++){
                        let product = products[i];
                        product.dataValues.urlImagen = `/uploads/products/${product.dataValues.image}`
                        product.dataValues.detail = `http://${req.headers.host}/api/products/${products[i].id}`
                        delete product.dataValues.image
                        delete product.dataValues.id_category
                        delete product.dataValues.id_size
                        delete product.dataValues.id_colour
                        productsJson.push(product)
                    }
                } else {
                // Cuando la página es mayor a 1, mostramos los productos de esa página
                // Página 2: productos del 11 al 20, Página 3: productos del 21 al 30
                    let offset = (parseInt(req.query.page) - 1) * 10
                    paging.offset = offset
                    
                    if (count - offset > 0) {
                        paging.previous = `http://${req.headers.host}/api/products?page=${parseInt(req.query.page) - 1}`
                    }
                    
                    if (count > (offset + 10)) {
                        paging.next = `http://${req.headers.host}/api/products?page=${parseInt(req.query.page) + 1}`
                        products = products.slice(offset, offset + 10)
                    } else {
                        products = products.slice(offset, products.length)
                    }
                    
                    for (let i = 0; i < products.length; i++){
                        let product = products[i];
                        product.dataValues.urlImagen = `/uploads/products/${product.dataValues.image}`
                        product.dataValues.detail = `http://${req.headers.host}/api/products/${products[i].id}`
                        delete product.dataValues.image
                        delete product.dataValues.id_category
                        delete product.dataValues.id_size
                        delete product.dataValues.id_colour
                        productsJson.push(product)
                    }
                }
                // Devuelvo los productos con status 200 OK
                response.count = count;
                response.countByCategory = countByCategory;
                response.products = productsJson;
                if (!paging) {
                    delete response.paging
                } else {
                    response.paging = paging
                }
                res.status(200).json(response)
            })
            // Si el callback falla, devuelvo el error con status 500 Internal Server Error
            .catch(function(e){
                res.status(500).json({
                    status: 500,
                    message: e.toString(),
                })
            })
        })
        // Si el callback falla, devuelvo el error con status 500 Internal Server Error
        .catch(function(e){
            res.status(500).json({
                status: 500,
                message: e.toString(),
            })
        });
    },
    
    // Products detail
    detalle: async function(req,res){
        // Busco el producto por ID

        if (req.params.id == 'last') {
            await db.Producto.findAll({
                limit: 1,
                order: [[ 'createdAt', 'DESC']],
                include: { all: true },
            })
            .then(function(products){            
                // Guardo el producto en una variable 
                let product = products[0]
    
                // Agrego urlImagen y quito campos que no quiero visualizar
                product.dataValues.urlImagen = `/uploads/products/${product.dataValues.image}`
                delete product.dataValues.image
                delete product.dataValues.id_category
                delete product.dataValues.id_size
                delete product.dataValues.id_colour
                
                // Devuelvo el producto con status 200 OK
                res.status(200).json(product)
            })
            // Si el callback falla, devuelvo el error con status 500 Internal Server Error
            .catch(function(e){
                res.status(500).json({
                    status: 500,
                    message: e.toString(),
                })
            });
        } else {
            await db.Producto.findByPk(req.params.id, {
                include: { all: true }}
            )
            .then(function(product){            
                // Si no lo encuentro, devuelvo 'Product not found' con status 404 Not Found
                if (product == null) {
                    res.status(404).json({
                        status: 404,
                        message: 'Product not found',
                    })
                }
    
                // Agrego urlImagen y quito campos que no quiero visualizar
                product.dataValues.urlImagen = `/public/uploads/products/${product.dataValues.image}`
                delete product.dataValues.image
                delete product.dataValues.id_category
                delete product.dataValues.id_size
                delete product.dataValues.id_colour
                
                // Devuelvo el producto con status 200 OK
                res.status(200).json(product)
            })
            // Si el callback falla, devuelvo el error con status 500 Internal Server Error
            .catch(function(e){
                res.status(500).json({
                    status: 500,
                    message: e.toString(),
                })
            });
        }
    },

    // Users list
    usuarios: async function(req,res){
        // Busco todos los productos y los ordeno por ID
        await db.Users.findAll({
            order: [[ 'id', 'ASC']],
            include: { all: true }
        })
        .then(function(users) {
            
            // Total de usuarios
            let count = users.length
            
            // Listado de productos (con paginado: 10 por página)
            let usersJson = []
            let paging = {
                limit: 10,
                offset: 0,
            }
            if ( req.query.page == undefined || req.query.page == '1' || isNaN(parseInt(req.query.page)) ) {
            // Cuando no se indica página, se indica pero no es un número o se indica y es 1, mostramos los primeros 10 elementos
                if (users.length > 10) {
                    paging.next = `http://${req.headers.host}/api/users?page=2`
                }
                users = users.slice(0,10)
                for (let i = 0; i < users.length; i++){
                    usersJson.push({
                        id: users[i].id,
                        name: users[i].name,
                        email: users[i].email,
                        detail: `http://${req.headers.host}/api/users/${users[i].id}`,
                    })
                }
            } else {
            // Cuando la página es mayor a 1, mostramos los usuarios de esa página
            // Página 2: usuarios del 11 al 20, Página 3: usuarios del 21 al 30
                let offset = (parseInt(req.query.page) - 1) * 10
                paging.offset = offset
                if (count > (offset + 10)) {
                    paging.next = `http://${req.headers.host}/api/users?page=${parseInt(req.query.page) + 1}`
                    users = users.slice(offset, offset + 10)
                } else {
                    users = users.slice(offset, users.length)
                }
                if (count - offset > 0) {
                    paging.previous = `http://${req.headers.host}/api/users?page=${parseInt(req.query.page) - 1}`
                }
                for (let i = 0; i < users.length; i++){
                    usersJson.push({
                        id: users[i].id,
                        name: users[i].name,
                        email: users[i].email,
                        detail: `http://${req.headers.host}/api/users/${users[i].id}`,
                    })
                }
            }
            // Devuelvo los usuarios con status 200 OK
            res.status(200).json({
                count: count,
                users: usersJson,
                paging: paging,
            })
        })
        // Si el callback falla, devuelvo el error con status 500 Internal Server Error
        .catch(function(e){
            res.status(500).json({
                status: 500,
                message: e.toString(),
            })
        });
    },
    
    // Users detail
    usuariosDetalle: async function (req, res){
        // Busco el usuario por ID
        await db.Users.findByPk(req.params.id, {
            include: { all: true }}
        )
        .then(function(user){            
            // Si no lo encuentro, devuelvo 'User not found' con status 404 Not Found
            if (user == null) {
                return res.status(404).json({
                    status: 404,
                    message: 'User not found',
                })
            }

            // Agrego urlImagen y quito campos que no quiero visualizar
            user.dataValues.urlImagen = `/public/uploads/avatars/${user.dataValues.avatar}`
            delete user.dataValues.password
            delete user.dataValues.id_category
            delete user.dataValues.avatar
            
            // Devuelvo el usuario con status 200 OK
            res.status(200).json(user)
        })
        // Si el callback falla, devuelvo el error con status 500 Internal Server Error
        .catch(function(e){
            res.status(500).json({
                status: 500,
                message: e.toString(),
            })
        });
    }
}
 
 
 
 
 
 

