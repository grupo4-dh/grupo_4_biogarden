module.exports=function(sequelize,dataTypes){

    let alias ="Pcategoria";//para cuando lo llame del codigo 
    let cols={
        category_id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:dataTypes.STRING,
    }
  
}

let config={
    tableName:"products_categories",
    timestamps:false
}
    let Pcategoria =sequelize.define(alias, cols,config);

    Pcategoria.associate=function(models){
        Pcategoria.hasMany(models.Producto,{
            as:"productos",
            foreignKey:"id_category"
        });

    }
    return Pcategoria;
}