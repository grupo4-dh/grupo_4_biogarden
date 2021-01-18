module.exports=function(sequelize,dataTypes){

    let alias ="Order";//para cuando lo llame del codigo 
    let cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        create_date:{
            type:dataTypes.DATE,
    },
    total_amount:{
        type:dataTypes.DECIMAL,
},
address:{
    type:dataTypes.STRING,
}

  
}

let config={
    tableName:"orders",
    timestamps:false
}
    let Order =sequelize.define(alias, cols,config);

    Order.associate=function(models){
        Order.belongsToMany(models.Producto,{
            as:"productos",
            through:"orders_details",
            foreignKey:"id_oder",
            otherkey:"id_product",
            timestamps:false
        });
    }


    return Order;
}