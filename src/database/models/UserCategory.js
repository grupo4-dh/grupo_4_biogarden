module.exports = (sequelize, DataTypes) => { 
    const UserCategory = sequelize.define("UserCategory",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'users_categories',
        timestamps: false,
    });
    UserCategory.associate = function(models){
        User.hasMany(models.User, {
            as: "users_categories",
            foreignKey: "users"
        })
    }
    return UserCategory
}