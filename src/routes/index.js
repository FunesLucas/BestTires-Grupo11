const express = require ('express');
const router = express.Router();
const mainController= require("../controllers/mainController");
const usersController= require("../controllers/usersController");
const productsController= require("../controllers/productsController");
const upload = require ('../middleware/multermidd');
const path = require ('path')
const guestMiddleware = require ('../middleware/guestMiddleware');
const authMiddleware = require ('../middleware/authMiddleware');
const validacionesUser = require('../middleware/validationsUserMiddleware');



const {usuarios}= require('../controllers')
const {productos}= require('../controllers')

const {body} = require ('express-validator');
const { createUsuario } = require('../model/usuarios');

const validations = [
    body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('apellido').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('email').notEmpty().withMessage('Tienes que escribir un correo electronico').bail().isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
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

router.get("/", mainController.index);

router.get("/login", guestMiddleware, usersController.login);
router.post("/login", usuarios.loginProcces );


//router.get("/registerNuevo", usersController.registernuevo );



router.get("/logout", usuarios.logout )
router.get("/detalleUsuario/:id", usuarios.detalleUsuario)
router.put("/detalleUsuario/:id",upload.single('avatar'),validations, usuarios.editUsuario)

router.get("/lista", productos.getProductos )
router.get("/listaUsuarios", usuarios.getUsuario )


router.get("/contacto", usersController.contacto);
//router.get("/products", productsController.products);
router.get("/products", productos.getProductos);
router.get("/userProfile",authMiddleware, usuarios.profile);

router.get("/carrito", productsController.carrito);

/*** CREATE ONE PRODUCT ***/ 
router.get("/cargaProduc",authMiddleware,productos.cargaProductos);

router.post("/cargaProduc",upload.single('avatar') ,productos.crearProductoProcces);


/*** REGISTER ***/ 
router.get("/register",guestMiddleware, usersController.register);
/*** PROCESA REGISTER ***/ 
//router.post("/register",upload.single('img'),validations, usersController.processRegister);
router.post("/register",upload.single('avatar'),validacionesUser, usuarios.createUsuario);


/*** GET ONE PRODUCT ***/ 
router.get('/productID/:id', productos.detalleProducto);


router.get("/editProduc/:id",authMiddleware,productos.editProducto);
router.put("/editProduc/:id",upload.single('avatar'),productos.editProductoProccess);

router.delete('/delete/:id',authMiddleware, productos.delete);


router.get("/check", function (req,res){
    if (req.session.userLogged == undefined) {
        res.send (' no estas logeado')
    }else {
        res.send('el usuario logeado es' + " " + req.session.userLogged.email)
    }
});
module.exports = router;