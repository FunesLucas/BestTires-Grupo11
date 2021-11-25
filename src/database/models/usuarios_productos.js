const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios_productos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usuarios_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'ID'
      }
    },
    productos_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'usuarios_productos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_usuarios_has_productos_productos1_idx",
        using: "BTREE",
        fields: [
          { name: "productos_ID" },
        ]
      },
      {
        name: "fk_usuarios_has_productos_usuarios1_idx",
        using: "BTREE",
        fields: [
          { name: "usuarios_ID" },
        ]
      },
    ]
  });
};
