module.exports=function(sequelize,dataTypes){

    let alias ="Comment";//para cuando lo llame del codigo 
    let cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
    },
    email:{
        type:dataTypes.STRING,
},
comment:{
    type:dataTypes.STRING,
}

  
}

let config={
    tableName:"comments",
    timestamps:false
}
    let Comment =sequelize.define(alias, cols,config);

    return Comment;
}