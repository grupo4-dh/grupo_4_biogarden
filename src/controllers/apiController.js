let db = require('../database/models/index');
const Producto = require('../database/models/Producto');

module.exports={

    count:function(req,res){
        return res.json({
            count:Producto.length,
            countByCategory:Pcategoria.length//???propiedad por categoria  con el total de producto?

        })
    },
    listado: async function (req,res){
        const products = await db.Producto.findAll({
            where: {
                status: 1
            },
            include: { all: true }
        });

        return res.json({
            products:products,
            //detail:// url con el detalle?
        });
    },
    detalle: async function(req,res){
        const products = await db.Producto.findByPk({
            where:{
                id:req.params.id},
                include: { all: true }
                //array por cada relacion de uno a muchos?
        });

        return res.json({
            products:products,
            //urlImagen:???
        })

    }

}

