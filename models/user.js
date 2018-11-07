const mongoose = require('mongoose');
const _ = require('underscore');
const uniqueValidator = require('mongoose-unique-validator');


// Se define el esquema de usuario de la BD.
let userSchema = new mongoose.Schema({
    name: {
        type: String,
        // Es necesario este campo para poder insertar en la BD.
        required: [true, 'El nombre es obligatorio']
    },
    username: {
        type: String,
        index: {unique: true},
        required: [true, 'El Nombre de usuario es obligatorio']
    },
    email: {
        type: String,
        // No se admiten duplicados.
        unique: true,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img : {
        type: String,
        required: false
    },
    friends:{
        type: [String], //referencia a user.username
        required: false
    },
    city: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    teams: {
        type: [String], //referencia a team.name
        required: false
    },
    playedGames: {
        type: Number,
        required: false,
    }
});

/*
 * Modifica el usuario retornado para envitar retornar valores
 * que no se necesitan.
 * More Info: http://mongoosejs.com/docs/guide.html#toJSON
 */
userSchema.methods.toJSON = function() {
    let user = this.toObject();
    user = _.pick(user, ['_id', 'name', 'email', 'img', 'friends', 'city', 'position']);
    return user;
};

// Plugin para modificar los mensajes de error.
userSchema.plugin(uniqueValidator, {message: 'Error: el {PATH} {VALUE} ya existe.'});

// Crea el modelo a partir del esquema del usuario y lo exporta.
module.exports = mongoose.model('user', userSchema);