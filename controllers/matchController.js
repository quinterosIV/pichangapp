const mongoose = require('mongoose');
const Match = require('../models/match');

exports.createMatch = (req, res) => {
    let body = req.body;

    let newMatch = new Match({
        name: body.name,
        author : req.params.username,
        local : body.local,
        guest : body.guest,
        state : 0,
        location : body.location,
        date : body.date,
        price : body.price,
        time : body.time
    });

    newMatch.save((err, matchDB) => {
        if(err)
            return res.status(400).json({
                ok: false,
                err: err
            });
        res.json({
            ok: true,
            match: matchDB,
            msg: 'Partido creado con exito.'
        });
    });
}