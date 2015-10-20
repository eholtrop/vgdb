var express = require('express');
var router = express.Router();
var Model = require("./../../models/models");

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'vgdbadmin',
        password: 'portal42',
        database: 'vgdb_development',
        charset: 'utf8'
    }
});

router.get('/api/releaseDates', function(req, res, next) {
    knex('dates').limit(100).join('release_dates').join('consoles').join('games').select('game_name', "console_name", "release_year", "release_month", "release_day").then(function(response){
        console.log(response);
        res.json(response);
    });
});

router.get('/api/releaseDates/:year', function(req, res, next) {
    knex('dates').where('release_year', req.params.yesr).then(function(response) {
        console.log(model);
        res.json(model.toJSON());
    });
});

//string query
router.get('/api/releaseDates/:year/:month', function(req, res, next) {
    knex('dates').where({ release_year: req.params.yesr, release_month: req.params.month }).then(function(response) {
        console.log(model);
        res.json(model.toJSON());
    });
});

//string query
router.get('/api/releaseDates/:year/:month/:day', function(req, res, next) {
    knex('dates').where({ release_year: req.params.yesr, release_month: req.params.month, release_dat: req.params.day }).then(function(response) {
        console.log(model);
        res.json(model.toJSON());
    });
});


module.exports = router;
