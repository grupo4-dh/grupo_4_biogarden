module.exports = (sequelize, DataTypes) => { 
    const Permission = sequelize.define("Permissions",
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
        tableName: 'permissions',
        timestamps: false,
    });
    Permission.associate = function(models){
        Permission.belongsToMany(models.UsersCategories, {
            as: "categories",
            through: "users_categories_permissions",
            foreignKey: "id_permission",
            otherKey: "id_category",
            timestamps: false,
        })
    }

    return Permission
}