let db = require('../database/models/index');
const Producto = require('../database/models/Producto');

module.exports={

    productos:async function(req,res){
        const products = await db.Producto.findAll({
            where: {
                status: 1
            },
            include:{ all: true }

        });

         const countByCategory= db.sequelize.query ('SELECT C.NAME, COUNT(*) AS "CANTIDAD"FROM PRODUCTS_CATEGORIES C JOIN PRODUCTS P ON C.ID = P.ID_CATEGORY GROUP BY C.NAME')
        .then(function(resultados){
             
         res.json({
            count:Producto.length,
            countByCategory:resultados[0],//???propiedad por categoria  con el total de producto?
            products:products
         
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

    }

}



