/*
 * Archivo que contiene las importaciones de todas las rutas.
 */
const  express = require('express');
const app = express();

// Importa las rutas de usuario. Debe ir despues del body-parser para que tengan efecto.
app.use(require('./user'));
// Importa las rutas de usuario. Debe ir despues del body-parser para que tengan efecto.
app.use(require('./login'));

app.use(require('./team'));
module.exports = app;
