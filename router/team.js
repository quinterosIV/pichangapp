const express = require('express');
const Team = require('../models/team');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();

app.post('/equipo',req,res) => {
  let body= red.body;
  let newTeam= new Team({
    name: body.name.
    shield: body.shield,
    calification: body.calification,
    pos: body.pos,
    players: body.players
  });

  newTeam.save((err,teamDB)) =>{
    // En caso de no crearlo, retorna el error.
   if(err)
       return res.status(400).json({
           ok: false,
           err: err,
       });
   // Si lo crea, retorna el valor del usuario.
    res.json({
        ok: true,
        user: teamDB,
        msg: 'Equipo creado con exito.'
  }


}

















module.exports = app;
