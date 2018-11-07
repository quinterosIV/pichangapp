const mongoose = require('mongoose');
const _ = require('underscore');
const uniqueValidator = require('mongoose-unique-validator');

let teamSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true,'El nombre es obligatorio']
  },
  cap : {
    type: String,
    required: true
  },
  shield: {
    type: String,
    required: false
  },
  players:{
    type: Array,
    required: false
  },
  matches: {
    type: Array,
    required: false
  },
  nvotes: {
    type: Number,
    required: false,
  },
  votes: {
    type: Number,
    required: false
  }
  
});

teamSchema.methods.toJSON = function() {
    let team = this.toObject();
    team = _.pick(team, ['_id', 'name', 'shield', 'nvotes', 'votes', 'calification', 'pos']);
    return team;
};

// Plugin para modificar los mensajes de error.
teamSchema.plugin(uniqueValidator, {message: 'Error: el {PATH} {VALUE} ya existe.'});

// Crea el modelo a partir del esquema del usuario y lo exporta.
module.exports = mongoose.model('team', teamSchema);
