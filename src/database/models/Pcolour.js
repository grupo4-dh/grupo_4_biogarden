module.exports=function(sequelize,dataTypes){

    let alias ="Pcolour";//para cuando lo llame del codigo 
    let cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:dataTypes.STRING,
    },

    hexadecimal:{
        type:dataTypes.STRING,

    }
  
}

let config={
    tableName:"colours",
    timestamps:false
}
    let Pcolour =sequelize.define(alias, cols,config);

    Pcolour.associate=function(models){
        Pcolour.hasMany(models.Producto,{
            as:"productos",
            foreignKey:"id_colour"
        });
    }


    return Pcolour;
}