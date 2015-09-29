var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Center = mongoose.model('Center');

/* GET home page. */
router.get('/list', function(req, res, next) {
  Center.find().populate('items').exec(function(err, centers) {
  	res.send({
  		centers: centers
  	});
  });
});

module.exports = router;
