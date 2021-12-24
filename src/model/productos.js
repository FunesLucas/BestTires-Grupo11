const { response } = require("express");
const db = require("../database/models")

const productosModel = {

    getProductos: async () => {
        try {
            const response = await db.productos.findAll()
            return response
        } catch (error) {
            console.log(`fallo consulta a la base de datos ${error.message}`);
        }
    },

    crearProductoProcces: async (unProducto) => {
        try {
            const response = await db.productos.create(unProducto)
            return response
        } catch (error) {
            console.log(`fallo consulta a la base de datos ${error.message}`);
        }
    },

    detalleProducto : async (id) => {
        const response = await db.productos.findByPk(id)
        return response
    },
    
    editProducto : async (id) => {
        const response = await db.productos.findByPk(id)
        return response
    },

    editProductoProccess : async (id, producto) => {
        console.log(producto)
        console.log(id)
        try {
            const respuesta = await db.productos.findByPk(id)
            const response = await db.productos.update(
                {
                    ...producto
                },
                {
                    where: {
                        id: id
                    }
                }
            )
        } catch (error) {
            console.log(`fallo consulta a la base de datos ${error.message}`)
            return []
        }
    },

    delete: async (id)  => {
        db.productos.destroy({
            where : {ID : id}
        })
    }

}

module.exports = productosModel