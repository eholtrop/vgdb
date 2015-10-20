var express = require('express');
var router = express.Router();
var Model = require("./../../models/models");
var request = require('request');

router.get('/:console', function(req, res, next) {
    var mc_console = req.params.console;

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

                SaveReleaseDate(game["name"], ConsoleChange(mc_console), game['rlsdate']);
            }
        } else {
            console.log(error);
            console.log(response.statusCode);
        }
    });
});

function SaveReleaseDate(game_name, console_name, new_date) {
    if(!new_date) return;
    var year = new_date.split("-")[0];
    var month = new_date.split("-")[1];
    var day = new_date.split("-")[2];

    Model.Game.where({game_name: game_name}).fetch().then(function(game) {
        Model.Console.where({console_name: console_name}).fetch().then(function (gameConsole) {
            console.log(gameConsole["attributes"]);
            Model.ReleaseDate.where({game_id: game["attributes"]['game_id'], console_id: gameConsole["attributes"]["console_id"]}).fetch({withRelated: ['game', 'console', 'date']}).then(function (releaseDate) {
                GetDate(year, month, day, function(date) {
                    if(!releaseDate) {
                        new Model.ReleaseDate({
                            console_id: gameConsole["attributes"]["console_id"],
                            game_id: game["attributes"]["game_id"],
                            date_id: date["date_id"]
                        }).save();
                    } else {
                        var rdate = releaseDate.toJSON();
                        Model.ReleaseDate({release_date_id: rdate.release_date_id}).save({date_id: date.date_id}, {patch: true});
                    }
                    console.log("Updated Date: " + game["attributes"]["game_name"] + " - " + gameConsole["attributes"]["console_name"] + " - " + new_date);
                });

                //if no dates for this game yet, find date and create release date
            });
        });
    });
}


function GetDate(year, month, day, callback) {
    Model.Date.where({
            release_year: year,
            release_month: month,
            release_day: day
        }).fetch().then(function (model) {
            if (model) {
                model.date_id = model.toJSON().date_id;
                new Model.ReleaseDate(model).save().then(function(date){
                    callback(date["attributes"]);
                });
            } else {
                new Model.Date({
                    release_year: year,
                    release_month: month,
                    release_day: day
                }).save().then(function (date) {
                        callback(date["attributes"]);
                    });
            }
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
