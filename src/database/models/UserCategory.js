module.exports = (sequelize, DataTypes) => { 
    const UsersCategory = sequelize.define("UsersCategories",
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
    UsersCategory.associate = function(models){
        UsersCategory.hasMany(models.Users, {
            as: "users",
            foreignKey: "id_category"
        }),
        UsersCategory.belongsToMany(models.Permissions, {
            as: "permissions",
            through: "users_categories_permissions",
            foreignKey: "id_category",
            otherKey: "id_permission",
            timestamps: false,
        })
    }
    return UsersCategory
}