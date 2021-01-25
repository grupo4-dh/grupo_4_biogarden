module.exports=function(sequelize,dataTypes){

    let alias ="Contact";//para cuando lo llame del codigo 
    let cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:dataTypes.STRING,
    },
    email:{
        type:dataTypes.STRING,
},
comment:{
    type:dataTypes.STRING,
}

  
}

let config={
    tableName:"contact",
    timestamps:false
}
    let Contact =sequelize.define(alias, cols,config);

    Order.associate=function(models){
        Order.belongsToMany(models.Producto,{
            as:"productos",
            through:"orders_details",
            foreignKey:"id_order",
            otherkey:"id_product",
            timestamps:false
        });
    }


    return Order;
}