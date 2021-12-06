
const {productosModel} = require("../model");
const db = require("../database/models")

const productosController = { 

    getProductos : async (req,res,next) => {
        
        const respuesta = await productosModel.getProductos()
        res.render ('products', {products : respuesta})
    },

    cargaProductos:  (req,res,next) => {
        res.render ('cargaProduc');
    },

    crearProductoProcces : async (req,res,next) => {
        
        let producToCreate = {
            avatar: req.file.filename,
            ancho: req.body.detalleProduct,
            perfil: req.body.ProfileProduct,
            rodado: req.body.Rolled,
            //marca: req.body.mark,
            modelo: req.body.model,
            precio: req.body.priceProduct
        }

        const respuesta = await productosModel.crearProductoProcces(producToCreate)
        res.redirect ('products');
    },

    detalleProducto: async (req,res,next) => {
        let id = req.params.id

        const respuesta = await db.productos.findByPk(id)
        res.render ('productID' , {product : respuesta})
    }
}

module.exports = productosController;