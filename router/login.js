/*
 * Archivo con las respuestas en la ruta localhost:8080/login
 */
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    User.findOne({email: body.email}, (err, userDB) => {
        if (err) {
           return res.status(500).json({
               ok: false,
               err
           });
        }

        if (!userDB) {
           return res.status(400).json({
               ok: false,
               err: 'Usuario o contraseña incorrectos'
           });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario o contraseña incorrectos'
            });
        }

        res.json({
            'ok': true,
            user: userDB
        })
    });
});




// Exporta las configuraciones anteriores.
module.exports = app;