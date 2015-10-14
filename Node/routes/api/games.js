var express = require('express');
var router = express.Router();
var Model = require("./../../models/models");

router.get('/api/games', function(req, res, next) {
    Model.Game.fetchAll({withRelated: ['release_dates']}).then(function(model) {
        console.log(model.toJSON());
        res.send(model.toJSON());
    });
});

module.exports = router;
