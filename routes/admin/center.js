var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Center = mongoose.model('Center');

router.get('/', function(req, res, next) {
  Center.find().populate('items').exec(function(err, centers) {
    res.render('admin/center/list', { title: 'Admin', items: centers });
  });
});

router.get('/details/:center_id', function(req, res, next) {
  Center.findOne({ _id: req.params.center_id }).populate('items').exec(function(error, center) {
  	res.render('admin/center/details', { title: center.name, center: center });
  })
});

module.exports = router;
