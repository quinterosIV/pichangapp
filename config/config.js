/*
 * Archivo con las configuraciones de conexiones.
 */

// --- Configuracion servidor
process.env.PORT = process.env.PORT || 8080;


// --- Entorno ---
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// process.env.NODE_ENV = 'mlab';


// --- Configuracion Base de datos ---
let urlDB;

if (process.env.NODE_ENV === 'dev')
    urlDB = 'mongodb://localhost:27017/pichangapp';

process.env.URLDB = urlDB;