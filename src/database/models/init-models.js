var DataTypes = require("sequelize").DataTypes;
var _marcas = require("./marcas");
var _productos = require("./productos");
var _usuarios = require("./usuarios");
var _usuarios_productos = require("./usuarios_productos");

function initModels(sequelize) {
  var marcas = _marcas(sequelize, DataTypes);
  var productos = _productos(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var usuarios_productos = _usuarios_productos(sequelize, DataTypes);

  productos.belongsTo(marcas, { as: "marca", foreignKey: "marcas_ID"});
  marcas.hasMany(productos, { as: "productos", foreignKey: "marcas_ID"});
  usuarios_productos.belongsTo(productos, { as: "producto", foreignKey: "productos_ID"});
  productos.hasMany(usuarios_productos, { as: "usuarios_productos", foreignKey: "productos_ID"});
  usuarios_productos.belongsTo(usuarios, { as: "usuario", foreignKey: "usuarios_ID"});
  usuarios.hasMany(usuarios_productos, { as: "usuarios_productos", foreignKey: "usuarios_ID"});

  return {
    marcas,
    productos,
    usuarios,
    usuarios_productos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
