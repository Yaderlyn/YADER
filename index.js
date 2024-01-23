// Importaciones
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import session from "express-session";

// Se instancia la libreria express
const app = express();

// Conectar a la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.log(error))

// Estableciendo PUG como motor de plantillas
app.set('view engine', 'pug');      

// Agregar bodyparser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Definimos puerto
const port = 4000;

// configuracion de sesiones en el sistema
app.use(session({
    secret:'12345',
    resave: true,
    saveUninitialized: true
}))

// Agregamos router
app.use('/', router)

// Cuando se ejecute express y empiece a escuchar
app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})