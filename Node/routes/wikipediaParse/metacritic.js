var express = require('express');
var router = express.Router();
var Model = require("./../../models/models");
var request = require('request');

router.get('/:console', function(req, res, next) {
    var mc_console = req.params.console;
    var console = ConsoleChange(mc_console);
    //var year = req.params.year;

    var url = "https://metacritic-2.p.mashape.com/game-list/" + mc_console + "/all?order_by=date";

    var header = {
        url: url,
        headers: {
            'X-Mashape-Key': "H4w25d2ScwmshYDFbHck8QZwCRXsp1ePsgWjsnwNUKyPry8xQX"
        }
    };

    request.get(header, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var results = JSON.parse(body)["results"];
            var games = [];


            for(var i = 0; i < results.length; i ++) {
                var game = results[i];

                new Model.Game({
                    game_name: game["name"],
                    picture: game["thumbnail"],
                    url: game["url"],
                    metacritic_score: game["score"],
                    esrb_rating: game["rating"]
                }).save();

                SaveReleaseDate(game["name"], console, game['rlsdate']);
            }
        } else {
            console.log(error);
            console.log(response.statusCode);
        }
    });
});

function SaveReleaseDate(game_name, console_name, new_date) {
    Model.Game.where({game_name: game_name}).fetch().then(function(game) {
        Model.Console.where({console_name: console_name}).fetch().then(function(vgconsole) {
            console.log(vgconsole.toJSON());
            Model.ReleaseDate.where({console_id: vgconsole['console_id'], game_id: game['game_id']}).fetch().then(function(date) {
                if(date) {
                    console.log("Update Date: " + game_name, ", ", vgconsole.toJSON()['console_id'] + ", " + new_date);
                    date['release_year'] = new_date.split("-")[0];
                    date['release_month'] = new_date.split("-")[1];
                    date['release_date'] = new_date.split("-")[2];
                } else {
                    console.log("Create Date: " + game_name, ", ", vgconsole.toJSON()['console_name'] + ", " + new_date);
                    date = {
                        console_id:         vgconsole.toJSON()['console_id'],
                        game_id:            game.toJSON()['game_id'],
                        release_year:       new_date.split("-")[0],
                        release_month:      new_date.split("-")[1],
                        release_day:        new_date.split("-")[2]
                    };
                }

                new Model.ReleaseDate(date).save();
            });
        });
    });
}

function ConsoleChange(console) {
    switch(console) {
        case 'ps4':
            return 'PS4';
            break;
        case 'xboxone':
            return 'Xbox One';
            break;
        case 'ps3':
            return 'PS3';
            break;
        case 'xbox360':
            return 'Xbox 360';
            break;
        case 'pc':
            return 'PC';
            break;
        case 'wii-u':
            return 'Wii U';
            break;
        case '3ds':
            return '3DS';
            break;
        case 'vita':
            return 'PS Vita';
            break;
    }
};

module.exports = router;
