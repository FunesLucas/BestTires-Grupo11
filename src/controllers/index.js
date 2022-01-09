const usuarios = require ('./usuarios');
const productos = require ('./productos');
const apiUser = require ('./apiUserController');
const apiProduct = require ("./apiProductsController");
const apiFabricantes = require ('./apiFabricantesController');
module.exports = {usuarios, productos, apiUser, apiProduct, apiFabricantes}