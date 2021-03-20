module.exports=function(sequelize,dataTypes){

    let alias = "Producto"; //para cuando lo llame del codigo 
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING,
        },
        price: {
            type: dataTypes.DECIMAL,
        },
        image: {
            type: dataTypes.STRING,
        },
        description: {
            type: dataTypes.STRING,
        },
        quantity: {
            type: dataTypes.INTEGER,
        },
        status: {
            type: dataTypes.INTEGER,
        },
        id_category: {
            type: dataTypes.INTEGER,
        },
        id_colour: {
            type: dataTypes.INTEGER,
        },
        id_size: {
            type: dataTypes.INTEGER,
        },
    }

    let config={
        tableName: "products",
        timestamps: true,
        underscored: true
    }
    let Producto = sequelize.define(alias, cols, config);

    Producto.associate=function(models){
        Producto.belongsTo(models.Pcolour, {
            as:"colores",
            foreignKey:"id_colour"
        }),
        Producto.belongsTo(models.Psize, {
            as:"tamanos",
            foreignKey:"id_size"
        }),
        Producto.belongsTo(models.Pcategoria, {
            as:"categorias",
            foreignKey:"id_category"
        }),
        Producto.belongsToMany(models.Order, {
            as:"ordenes",
            through:"orders_details",
            foreignKey:"id_product",
            otherkey:"id_order",
            timestamps:true,
            underscored:true
        }
    )};
    return Producto;
}