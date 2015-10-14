var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('regions');
});

router.post(function(req, res, nextt) {

});

module.exports = router;
