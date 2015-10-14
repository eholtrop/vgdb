var express = require('express');
var router = express.Router();
var Model = require("./../../models/models");

router.get('/api/releaseDates', function(req, res, next) {
    Model.ReleaseDate.fetchAll({withRelated: ['game', 'console']}).then(function(model) {
        console.log(model.toJSON());
        res.json(model.toJSON());
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
