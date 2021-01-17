module.exports=function(sequelize,dataTypes){

    let alias ="Producto";
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
        type:dataTypes.DECI,
    }


}
    let Producto =sequelize.define(alias, cols,config);


    return=Producto;
}