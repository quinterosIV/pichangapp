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
exports.getRanking = (req,res) => {
    Team.find({}, function(err, teams) {
        var RankList = [];
    
        teams.forEach(function(team) {
            var valor=team.votes/team.nvotes;
            team["calification"]=valor;
            RankList.push(team);
        });
    
        res.send(RankList);  
    });
}
    
/**homes.sort(function(a, b) {
    return parseFloat(a.price) - parseFloat(b.price);
}); */

exports.calificar = (req,res) => {

  Team.findOneAndUpdate({name:body.name}, {$inc : { nvotes: 1, votes: body.votes}},{new: true},(err,doc) => {
    if (err)            
        return res.status(400).json({
        ok: false,
        err: err,
    });
    res.json({
        ok: true,
        msg: "la calificacion actual es: " + doc.votes/doc.nvotes
    });
  });
}
