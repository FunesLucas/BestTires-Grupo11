const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productos', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ancho: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    perfil: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rodado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    marcas_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'marcas',
        key: 'ID'
      }
    },
    modelo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    avatar : {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'productos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "fk_productos_marcas_idx",
        using: "BTREE",
        fields: [
          { name: "marcas_ID" },
        ]
      },
    ]
  });
};
