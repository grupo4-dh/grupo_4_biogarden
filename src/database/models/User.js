module.exports = (sequelize, DataTypes) => { 
    const User = sequelize.define("Users",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            id_category: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
            }
        },
        {
            tableName: 'users',
            timestamps: true,
            underscored: true
        }
    );
    User.associate = function(models){
        User.belongsTo(models.UsersCategories, {
            as: "user_category",
            foreignKey: "id_category"
        })
    }
    return User
}