var express = require('express');
var router = express.Router();
var Model = require("./../../models/models");

router.get('/:year', function(req, res, next) {
    //todo: remove all shit to do with 2015
    //todo: parse wikipedia year page
    res.send('validate');
});

module.exports = router;
