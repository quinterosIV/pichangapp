/*
 * Archivo con las respuestas en la ruta localhost:8080/usuario
 */
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();

// Responde peticiones GET en el directorio "localhost:8080".
app.get('/', (req, res) => {
    res.json('Pagina de inicio');
});

// Lista todos los usuarios en "localhost:8080/usuario".
app.get('/usuario', (req, res) => {
    // Saca el parametro "start" del metodo GET por la url.
    let queryStart = Number(req.query.start || 0);
    let queryLimit = Number(req.query.limit || 5);

    // Encuentra solo los usarios activos (state: 'true').
    User.find({state: 'true'})
        // Omite la cantidad especificada de usuarios
        .skip(queryStart)
        // Limita la query a 5 usuarios
        .limit(queryLimit)
        // Ejecuta la busqueda
        .exec((err, userList) => {
            // Manejo de error
            if(err)
                return res.status(400).json({
                    ok: false,
                    err: err,
                });
            // Retorna un json en caso de exito.
            User.count({state: 'true'}, (err, count) => {
                res.json({
                    ok: true,
                    userList,
                    msg: 'Lista de usuarios.',
                    total_users: count

                });
            });
        });
});

// Creacion de usuarios con solicitudes POST en "localhost:8080/usuario".
app.post('/usuario', (req, res) => {
    let body = req.body;
    // Crea un nuevo usuario con el esquema importado.
    let newUser = new User({
        name: body.name,
        email: body.email,
        password: body.password ? bcrypt.hashSync(body.password, 10) : body.password,
        role: body.role
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

// Respuesta para la pagina de cada usuario con metodo GET en "localhost:8080/usuario/algun_id".
app.get('/usuario/:id', (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, userDB) => {
        if(err)
            return res.status(400).json({
                ok: false,
                err: err,
            });
        res.json({
            ok: true,
            user: userDB,
            msg: 'Usuario cargado con exito.'
        });
    });
});

// Modificar la informacion personal para cada usuario con metodo PUT en "localhost:8080/usuario/algun_id".
app.put('/usuario/:id', (req, res) => {
    /*
     * Para filtrar que valores de usuario se pueden actualizar, se puede hacer un
     * "delete body.paramToDelete". Esto puede resultar muy ineficiente. Para mejorarlo,
     * se utiliza la libreria 'underscore', que permite seleccionar los valores mediantes
     * una lista de estos.
     */
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role']);

    User.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}, (err, userDB) => {
        if(err)
            return res.status(400).json({
                ok: false,
                err: err,
            });

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario no encontrado',
            });
        }

        res.json({
            ok: true,
            user: userDB,
            msg: 'Usuario modificado con exito.'
        });
    });
});

app.post('/usuario/add/:id',(req,res)=>{
    let friend = req.params.id;
    let user_id= req.body.user_id;
    User.findByIdAndUpdate(user_id,{$addToSet: {friends: friend}}, {new: true, runValidators: true, context: 'query'}, (err, userDB) => {
        if(err)
            return res.status(400).json({
                ok: false,
                err: err,
            });

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario no encontrado',
            });
        }

        res.json({
            ok: true,
            user: userDB,
            msg: 'Usuario modificado con exito.'
        });
    });
    User.findByIdAndUpdate(friend,{$addToSet: {friends: user_id}},{new: true, runValidators: true, context: 'query'}, (err, userDB) => {
        if(err)
            return res.status(400).json({
                ok: false,
                err: err,
        });

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario no encontrado',
            });
        }

        res.json({
            ok: true,
            user: userDB,
            msg: 'Usuario modificado con exito.'

        });
    });
});

// Elimina fisicamente un usuario de la BD.
/*app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    User.findByIdAndRemove(id, (err, userDB) => {
        if(err)
            return res.status(400).json({
                ok: false,
                err: err,
            });

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario no encontrado',
            });
        }
        res.json({
            ok: true,
            user: userDB,
            msg: 'Usuario eliminado con exito.'
        });
    });
});*/

// Marca un usario como eliminado (state: false), pero no lo borra fisicamente de la BD.
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;

    User.findByIdAndUpdate(id, {state: 'false'}, {new: true, context: 'query'}, (err, userDB) => {
        if(err)
            return res.status(400).json({
                ok: false,
                err: err,
            });

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario no encontrado',
            });
        }

        res.json({
            ok: true,
            user: userDB,
            msg: 'Usuario eliminado con exito.'
        });
    });
});


// Exporta las configuraciones anteriores.
module.exports = app;