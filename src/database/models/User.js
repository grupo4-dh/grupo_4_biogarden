module.exports = (sequelize, DataTypes) => { 
    const User = sequelize.define("Users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        id_category: {
            type: DataTypes.INTEGER
        },
        avatar: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'users',
        timestamps: false,
    });
    User.associate = function(models){
        User.belongsTo(models.UsersCategories, {
            as: "user_category",
            foreignKey: "id_category"
        })
    }
    return User
}