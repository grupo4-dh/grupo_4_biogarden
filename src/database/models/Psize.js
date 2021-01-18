module.exports=function(sequelize,dataTypes){

    let alias ="Psize";//para cuando lo llame del codigo 
    let cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:dataTypes.STRING,
    }
  
}

let config={
    tableName:"sizes",
    timestamps:false
}
    let Psize =sequelize.define(alias, cols,config);

    Psize.associate=function(models){
        Psize.hasMany(models.Producto,{
            as:"productos",
            foreignKey:"id_size"
        });
    }


    return Psize;
}