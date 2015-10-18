var express = require('express');
var router = express.Router();
var Model = require("./../../models/models");

/* GET users listing. */
router.get('/api/consoles', function(req, res, next) {
    Model.Console.fetchAll().then(function(model) {
        console.log(model.toJSON());
        res.send(model.toJSON());
    });
});

router.post(function(req, res, nextt) {

});

module.exports = router;
