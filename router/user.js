/*
 * Archivo con las respuestas en la ruta localhost:8080/usuario
 */
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const app = express();

// Responde peticiones GET en el directorio "localhost:8080".
app.get('/', (req, res) => {
    res.json('Pagina de inicio');
});

// Creacion de usuarios con solicitudes POST en "localhost:8080/usuario".
app.post('/usuario', (req, res) => {
    let body = req.body;
    // Crea un nuevo usuario con el esquema importado.
    let newUser = new User({
        name: body.name,
        email: body.email,
        password: body.password ? bcrypt.hashSync(body.password, 10) : body.password,
        city: body.city,
        position: body.position
    });

    // Guarda el usuario en la base de datos.
    newUser.save((err, userDB) => {
        // En caso de no crearlo, retorna el error.
        if(err)
            return res.status(400).json({
                ok: false,
                err: err,
            });
        // Si lo crea, retorna el valor del usuario.
        res.json({
            ok: true,
            user: userDB,
            msg: 'Usuario creado con exito.'
        });
    });
});

module.exports = app;
