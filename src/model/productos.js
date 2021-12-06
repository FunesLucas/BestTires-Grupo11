const db = require("../database/models")

const productosModel = {

    getProductos: async () => {
        try {
            const response = await db.productos.findAll()
            return response

        } catch (error) {
            console.log(`fallo consulta a la base de datos ${error.message}`);
        }
    }

}

module.exports = productosModel