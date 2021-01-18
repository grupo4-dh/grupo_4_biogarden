module.exports=function(sequelize,dataTypes){

    let alias ="Producto";//para cuando lo llame del codigo 
    let cols={
        product_id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        title:{
            type:dataTypes.STRING,
    },
    price:{
        type:dataTypes.DECIMAL,
    },
    image:{
        type:dataTypes.STRING,
    },

    quantity:{
        type:dataTypes.STRING,

    },
    status:{
        type:dataTypes.STRING,
    }
}

let config={
    tableName:"products",
    timestamps:false
}
    let Producto =sequelize.define(alias, cols,config);

    Producto.associate=function(models){
        Producto.belongTo(models.Pcolour,{
            as:"colores",
            foreignKey:"id_colour"
        }),

        Producto.associate=function(models){
            Producto.belongTo(models.Psize,{
                as:"tamanos",
                foreignKey:"id_size"
            }),

            Producto.associate=function(models){
                Producto.belongTo(models.Pcategoris,{
                    as:"categorias",
                    foreignKey:"id_category"
                }),


    }
    
    
    return Producto;
}