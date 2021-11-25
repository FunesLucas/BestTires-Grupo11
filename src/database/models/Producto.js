module.exports = function(sequelize, dataTypes) {
    let alias= "Productos"
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ancho:{
            type: dataTypes.INTEGER
        },
        perfil: {
            type: dataTypes.INTEGER
        },
        rodado: {
            type: dataTypes.INTEGER
        },
        precio: {
            type: dataTypes.DECIMAL
        },
        modelo: {
            type: dataTypes.STRING
        },
        marcas_ID: {
            type: dataTypes.INTEGER
        }
    }
    
    let config = {
        tableName: "productos",
        timestamps: false
    }
    
    let Producto = sequelize.define(alias, cols, config);
    
    Producto.associate = function (models) {
        Producto.belongsTo(models.Marcas ,{
            as:"marca",
            foreignkey: "marcas_ID"
        })

        Producto.belongsToMany(models.Usuarios ,{
            as:"usuarios",
            through: "usuarios_productos",
            foreignkey: "productos_ID",
            otherKey: "usuarios_ID",
            timestamps: false
        })
    }

    
    return Producto;
    };

    