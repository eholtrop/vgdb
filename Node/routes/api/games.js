var express = require('express');
var router = express.Router();


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

router.get('/api/games', function(req, res, next) {
    knex('games').select('game_name').then(function(response){
        console.log(response);
        res.json(response);
    });
});

module.exports = router;
