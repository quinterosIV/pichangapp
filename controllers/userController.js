const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Creacion de usuarios con solicitudes POST en "localhost:8080/usuario".
exports.createUser = (req, res) => {
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
}