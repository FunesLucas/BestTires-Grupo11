const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "./public")));
const rutasIndex = require("./routes/index.js");
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE
const userLoggedmidd = require('./middleware/userLoggedmidd');
const cookieparser = require ('cookie-parser')
const cors = require ("cors")

const session = require('express-session'); // 
const { cookie } = require("express-validator");
app.use(session({                          //
  secret: 'shh',                           // Para poder utilizar sessiones
  resave: false,                           //
  saveUninitialized: false                 //
}))





app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false })); // Para poder utilizar formularios
app.use(express.static('./public'))



app.set('view engine','ejs');
app.set('views', path.join(__dirname,'./views'))


app.use(cookieparser())
app.use(userLoggedmidd);
app.use('/', rutasIndex);
app.use(cors());



const puerto = process.env.PORT || 3001
app.listen(puerto, () => {
  console.log('Server is running on PORT ' + puerto);
});



