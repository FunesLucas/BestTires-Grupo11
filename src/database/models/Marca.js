module.exports = function(sequelize, dataTypes) {
    let alias= "Marcas"
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: dataTypes.STRING
        }
    }
    
    let config = {
        tableName: "marcas",
        timestamps: false
    }
    
    let Marca = sequelize.define(alias, cols, config);
    
    Marca.associate = function (models) {
        Marca.hasMany(models.Productos ,{
            as:"productos",
            foreignkey: "marcas_ID"
        })
    }
    return Marca;
    };