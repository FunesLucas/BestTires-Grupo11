const db = require("../database/models");

const controller = {

    listado: async (req, res) => {
        try {

            listaFabricantes = [];

            const fabricantes = await db.marcas.findAll();

            fabricantes.forEach((item) => {
                let lista = {
                    id: item.ID,
                    nombre: item.nombre,
                    
                }
                return fabricantes.push(lista);
            });

            res.status(200).json({
                count: fabricantes.length,
                data: fabricantes,
            });
        } catch (error) {
            res.status(500)
        }

    }


}
    


module.exports = controller;