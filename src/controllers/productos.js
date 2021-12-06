const {productosModel} = require("../model");

const productosController = { 

    getProductos : async (req,res,next) => {
        
        const respuesta = await productosModel.getProductos()
        res.send(respuesta);
    }
}

module.exports = productosController;