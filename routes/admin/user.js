var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var Center = mongoose.model('Center');
var Item = mongoose.model('Item');

passport.use(new LocalStrategy(
  function(username, password, done) {
  	console.log(username + " " + password)
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

router.get('/login', function(req, res, next) {
  res.render('admin/user/login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  res.redirect('/admin/center');
});

router.get('/create', function(req, res, next) {
  // var user = User({
	 //  name: "Karolis Stasaitis",
	 //  username: "stkarolis@gmail.com",
	 //  password = "operator12"
  // })
  // user.save(function (err) {
  // 	if (err) // ...
  // 	console.log('meow');
  // });

  var center = Center({
    name: "Help Center",
    address: "Paul-Lincke-Ufer 39, Berlin",
    longitude: -42.321,
    latitude: 23.323,
    email: "charity@cross.red",
    description: "A test charity",
    phone_number: "+47 1234321234"
  })
  center.save(function (err) {
  	if (err) // ...
  	console.log(err);
  });

  var item1 = Item({
    name: "Help Center",
    quantity: 1,
    due_date: Date.now(),
    phone_number: "+47 1234321234",
    center: center._id
  })
  item1.save(function (err) {
  	if (err) // ...
  	console.log(err);
  });

  var item2 = Item({
    name: "Help Center",
    quantity: 2,
    due_date: Date.now(),
    phone_number: "+47 1234321234",
    center: center._id
  })
  item2.save(function (err) {
  	if (err) // ...
  	console.log(err);
  });

  res.send('Another dumb entry created');
});


module.exports = router;
