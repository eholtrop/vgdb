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
    knex('dates').limit(100).then(function(dates){
        console.log(response);
        res.json(response);
    });
});

router.get('/api/releaseDates/:year', function(req, res, next) {
    knex('dates').where('release_year', req.params.year).then(function(dates) {
        var releases = [];
        var i = 0;
        for(var j = 0; j < dates.length; j++) {
            var date = dates[j];
            GetReleaseDates(date, function(release){
                releases.push(release);
                i++;
                if(i == dates.length){
                    console.log(releases);
                    res.json(releases);
                }
            });
        }
    });
});

//string query
router.get('/api/releaseDates/:year/:month', function(req, res, next) {
    knex('dates').where({ release_year: req.params.year, release_month: req.params.month }).then(function(dates) {
        var releases = [];
        var i = 0;
        console.log(dates);
        for(var j = 0; j < dates.length; j++) {
            var date = dates[j];
            GetReleaseDates(date, function(release){
                releases.push(release);
                i++;
                if(i == dates.length){
                    res.json(releases);
                }
            });
        }
    });
});

//string query
router.get('/api/releaseDates/:year/:month/:day', function(req, res, next) {
    knex('dates').where({ release_year: req.params.year, release_month: req.params.month, release_day: req.params.day }).then(function(dates) {
        var releases = [];
        var i = 0;
        for(var j = 0; j < dates.length; j++) {
            var date = dates[j];
            GetReleaseDates(date, function(release){
                releases.push(release);
                i++;
                if(i == dates.length){
                    console.log(releases);
                    res.json(releases);
                }
            });
        }
    });
});

function GetReleaseDates(date, callback) {
    knex('release_dates').where({ date_fk: date['date_id'] })
        .join('games', "release_dates.game_fk", '=', 'games.game_id')
        .join('consoles', "release_dates.console_fk", '=', 'consoles.console_id')
        .select( 'game_name', 'console_name', 'url', 'metacritic_score', 'esrb_rating', 'picture')
        .then(function(response) {
            date['releases'] = response;
            callback(date);
    });
}


module.exports = router;
