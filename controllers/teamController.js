const mongoose = require('mongoose');
const Team = require('../models/team');

exports.createTeam = (req, res) => {
    let body = req.body;
    let newTeam = new Team({
        name: body.name,
        cap: body.cap,
        shield: body.shield,
        players: body.players,
        nvotes: 0,
        votes: 0,
    });

    newTeam.save((err, teamDB) => {
        if(err)
            return res.status(400).json({
                ok : false,
                err: err,
            });
        res.json({
            ok: true,
            user: teamDB,
            msg: 'Equipo creado con extio.'
        });
    });
}