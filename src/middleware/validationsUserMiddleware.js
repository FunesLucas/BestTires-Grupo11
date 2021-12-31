const {body} = require ('express-validator');
const path = require ('path')
const validationsUserMiddleware = [
    body('nombre').notEmpty().withMessage('Debes Ingresar un nombre').isLength({
        min: 2}).withMessage('Debe contener almenos 2 letras'),
    body('apellido').notEmpty().withMessage('Debes Ingresar un apellido'),
    body('email').notEmpty().withMessage('Debes Ingresar un email').isEmail().withMessage('Debes ingresar un email valido'),
    body('password').notEmpty().withMessage('Debes Ingresar una contraseña'),
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

module.exports = validationsUserMiddleware ;