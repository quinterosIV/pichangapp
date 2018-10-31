const mongoose = require('mongoose');
const _ = require('underscore');
const uniqueValidator = require('mongoose-unique-validator');

let teamSchema = new mongoose.Schema({
  name: {
    type String,
    unique: true,
    required: [true,'El nombre es obligatorio']
  },

  shield: {
    type: String,
    required: [true,'Es necesario ingresar un escudo al equipo']
  },

  calification:{
    type: String,
  },
  pos: {
    type: String,
  }
  players:{
    type: Array,
    required: false
  }
});

teamSchema.methods.toJSON = function() {
    let team = this.toObject();
    team = _.pick(team, ['_id', 'name', 'shield', 'calification', 'pos']);
    return team;
};

// Plugin para modificar los mensajes de error.
teamSchema.plugin(uniqueValidator, {message: 'Error: el {PATH} {VALUE} ya existe.'});

// Crea el modelo a partir del esquema del usuario y lo exporta.
module.exports = mongoose.model('team', teamSchema);
