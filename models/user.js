const mongoose = require('mongoose');
const _ = require('underscore');
const uniqueValidator = require('mongoose-unique-validator');

// Valores del campo 'role' permitidos, con mensaje de error.
let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

// Se define el esquema de usuario de la BD.
let userSchema = new mongoose.Schema({
    name: {
        type: String,
        // Es necesario este campo para poder insertar en la BD.
        required: [true, 'El nombre es obligatorio']
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
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

/*
 * Modifica el usuario retornado para envitar retornar valores
 * que no se necesitan.
 * More Info: http://mongoosejs.com/docs/guide.html#toJSON
 */
userSchema.methods.toJSON = function() {
    let user = this.toObject();
    user = _.pick(user, ['_id', 'name', 'email', 'img', 'role', 'state', 'google']);
    return user;
};

// Plugin para modificar los mensajes de error.
userSchema.plugin(uniqueValidator, {message: 'Error: el {PATH} {VALUE} ya existe.'});

// Crea el modelo a partir del esquema del usuario y lo exporta.
module.exports = mongoose.model('user', userSchema);