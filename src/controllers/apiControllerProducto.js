let db = require('../database/models/index');
//const Producto = require('../database/models/Producto');
//const User = require('../database/models/User');

module.exports={

    //-----PRODUCTOS-----//

    productos:async function(req,res){
        const products = await db.Producto.findAll({
            where: {
                status: 1
            },
            include:{ all: true }

        });

         const countByCategory=db.sequelize.query ('SELECT C.NAME, COUNT(*) AS "CANTIDAD"FROM PRODUCTS_CATEGORIES C JOIN PRODUCTS P ON C.ID = P.ID_CATEGORY GROUP BY C.NAME')
        .then(function(resultados){
             
         res.json({
            count:Producto.length,
            countByCategory:resultados[0],//???propiedad por categoria  con el total de producto?
            products:products,
            urlDetalle:`/api/products/:id/${products.description}`
         
        })
    })
    },
    detalle:async function(req,res){
        const products = await db.Producto.findByPk(req.params.id,{
        
                include: {all: true}
                //array por cada relacion de uno a muchos?
        });
        return res.json({
            products:products,
            urlImagen:`/public/uploads/products/${products.image}`
        })

    },
    //-------USUARIOS----//
    usuarios: async function(req,res){
        const usuario=await db.Users.findAll({
            where: {
                id_category:1
            },
        include:{ all: true }

        })

     res.status(200).json({
        count:usuario.length,
        usuario:usuario,
        urlDetalle:`/api/users/${usuario.params}`,
        status:200
    })
    },

    usuariosDetalle: async function (req,res){
        const users = await db.Users.findByPk(req.params.id,{
        
            include: {all: true}
            //array por cada relacion de uno a muchos?
    });
    return res.json({
        users:users,
        urlImagen:`/public/uploads/avatars/${users.avatar}`
    })

    }

}





