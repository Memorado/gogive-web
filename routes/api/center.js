var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Center = mongoose.model('Center');
var Category = mongoose.model('Category');

/* GET home page. */
router.get('/list', function(req, res, next) {
  Center.find().populate('items').exec(function(err, centers) {
    var options = {
      path: 'items.category',
      model: 'Category'
    };
    Category.populate(centers, options, function (err, center) {
    	res.send({
    		centers: centers
    	});
    });
  });
});

module.exports = router;
