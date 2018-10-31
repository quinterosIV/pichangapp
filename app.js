/*
 * Aplicacion principal.
 */
require('./config/config');
const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Importa archivo con todas las rutas de usuario.
app.use(require('./router/index'));

/* Hace la conexion a la base de datos. No es necesario que exista la base de datos, ya
 * que al momento de insertar datos, mongo crea automaticamente la estructura.
 */
mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err) => {
    if (err)
        throw err;
    else
        console.log('Base de datos REST-database online');
});

/*
 * Monta el servidor en dicho puerto.
 */
const ws = app.listen(process.env.PORT, () => {
    const port = ws.address().port;
    console.log(`Servidor corriendo en el puerto ${port}`);
}).on('error', (err) => {
    // Siempre es mejor arrojar un error que puede ser manejado, en vez de hacer
    // un process.exit().
    throw new Error(`${err.errno}: El puerto ${process.env.PORT} esta siendo usado.`);
});

