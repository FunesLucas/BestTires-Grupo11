module.exports = function(sequelize, dataTypes) {
    let alias= "Usuarios"
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING(100)
        }
    }
    
    let config = {
        tableName: "usuarios",
        timestamps: false
    }
    
    let Usuario = sequelize.define(alias, cols, config);
    
    Usuario.associate = function (models) {
        Usuario.belongsToMany(models.Productos ,{
            as:"productos",
            through: "usuarios_productos",
            foreignkey: "usuarios_ID",
            otherKey: "productos_ID",
            timestamps: false
        })
    }

    return Usuario;
    };