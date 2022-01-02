const {body} = require ('express-validator');
const path = require ('path')
const validationsProductMiddleware = [
    body('model').notEmpty().withMessage('Debe ingresar el modelo'),
    body('ancho').notEmpty().withMessage('Debe ingresar el ancho'),
    body('perfil').notEmpty().withMessage('Debe ingresar el perfil'),
    body('rodado').notEmpty().withMessage('Debe ingresar el rodado'),
    body('precio').notEmpty().withMessage('Debe ingresar el precio'),
    body('marcas').notEmpty().withMessage('Debe ingresar marca'),
    body('avatar').custom((value,{req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if (!file) {
            throw new Error ('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname); 
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
            

        }

        return true;
    })
]

module.exports = validationsProductMiddleware;