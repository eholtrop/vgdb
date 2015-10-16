var express = require('express');
var router = express.Router();
var Model = require("./../../models/models");
var request = require('request');

router.get('/:year', function(req, res, next) {
    var url = "https://metacritic-2.p.mashape.com/game-list/ps4/all?order_by=date";

    var header = {
        url: url,
        headers: {
            'X-Mashape-Key': "H4w25d2ScwmshYDFbHck8QZwCRXsp1ePsgWjsnwNUKyPry8xQX"
        }
    };

    request.get(header, function (error, response, body) {
        console.log("response.... unknown!");
        if (!error && response.statusCode == 200) {
            console.log("success!");
            var results = JSON.parse(body)["results"];
            var games = [];


            for(var i = 0; i < results.length; i ++) {
                var game = results[i];

                new Model.Game({
                    game_name: game["name"],
                    picture: game["thumbnail"]
                }).save();


                games.push({
                    game_name: game["name"],
                    picture: game["thumbnail"]
                });
            }

            res.send(games);
        } else {
            console.log(error);
            console.log(response.statusCode);
        }
    });
});

module.exports = router;
