const { response } = require("express");
const db = require("../database/models")

const productosModel = {
    findAll : async () => {
        const respuesta = await db.productos.findAll({
            include: [{ association: "marca" }]
        })
        return respuesta
    },

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
    
    marcas : async (id) => {
        const response = await db.productos.findByPk(id, {
            include: [{ association: "marca" }]
        } )
        return response
    },
    editProducto : async (id) => {
        const response = await db.productos.findByPk(id )
        return response
    },

    editProductoProccess : async (id, producto, avatar) => {
        console.log(producto)
        console.log(id)
        try {
            const respuesta = await db.productos.findByPk(id)
            const response = await db.productos.update(
                {
                    ...producto,
                    avatar: avatar
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