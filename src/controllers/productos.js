
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
            ancho: req.body.ancho,
            perfil: req.body.perfil,
            rodado: req.body.rodado,
            //marca: req.body.mark,
            modelo: req.body.modelo,
            precio: req.body.precio
        }

        const respuesta = await productosModel.crearProductoProcces(producToCreate)
        res.redirect ('products');
    },

    detalleProducto: async (req,res,next) => {
        let id = req.params.id

        const respuesta = await productosModel.detalleProducto(id)
        //const respuesta = await db.productos.findByPk(id)
        res.render ('productID' , {product : respuesta})
    },

    editProducto: async (req,res,next) => {
        let id = req.params.id

        const respuesta = await productosModel.editProducto(id)
        //const respuesta = await db.productos.findByPk(id)
        res.render ('editProduc' , {products : respuesta})
    },

    editProductoProccess: async (req, res, next) => {
        //console.log(req.body)
        //console.log(req.params.id)
        try {
            let id = req.params.id
            const respuesta = await productosModel.editProductoProccess(id, req.body)
        } catch (error) {
            console.log(`fallo consulta a la base de datos ${error.message}`)
            return []
        }
        res.redirect("/products")
    }
}

module.exports = productosController;