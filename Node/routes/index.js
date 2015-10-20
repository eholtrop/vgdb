var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = "http://localhost:3000/api/releaseDates/";

  var header = {
    url: url
  };

  request.get(header, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render('index', { dates: JSON.parse(body), title: "Video Game Database" });
    } else {
      console.log(error);
      console.log(response.statusCode);
    }
  });
});

module.exports = router;
