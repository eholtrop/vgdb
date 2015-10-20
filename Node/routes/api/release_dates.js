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
    Model.ReleaseDate.where({release_year: req.params.year}).fetchAll().then(function(model) {
       console.log(model);
        res.json(model.toJSON());
    });
});

//string query
router.get('/api/releaseDates/:year/:month', function(req, res, next) {
    Model.ReleaseDate.where({release_year: req.params.year, release_month: req.params.month}).fetchAll().then(function(model) {
        console.log(model);
        res.json(model.toJSON());
    });
});

//int query
router.get('/api/releaseDates/:year/:quarter', function(req, res, next) {
    Model.ReleaseDate.where({release_year: req.params.year, release_quarter: req.params.quarter}).fetchAll().then(function(model) {
        console.log(model);
        res.json(model.toJSON());
    });
});

module.exports = router;
