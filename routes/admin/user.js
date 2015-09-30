var express = require('express');
var router = express.Router();

var passport = require('passport');
var mongoose = require('mongoose');

var User = mongoose.model('User');

var Center = mongoose.model('Center');
var Item = mongoose.model('Item');
var Category = mongoose.model('Category');

router.get('/login', function(req, res, next) {
  res.render('admin/user/login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  res.redirect('/admin/center');
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/create', function(req, res, next) {
  // var user = User({
	 //  name: "Test Admin",
	 //  username: "test@memorado.com",
	 //  password: "memoradoftw"
  // });
  // user.save(function (err) {
  // 	if (err) // ...
  // 	console.log('meow');
  // });
  // var catObjects = [
  //   {englishName:"Baby milk (tetrapak)",germanName:"Baby Anfangsmilch Tetrapak"},
  //   {englishName:"Baby products (general)",germanName:"Babyhygiene (allgemein)"},
  //   {englishName:"Baby lotion",germanName:"Babylotion"},
  //   {englishName:"Baby food",germanName:"Babynahrung"},
  //   {englishName:"Baby oil",germanName:"Babyöl"},
  //   {englishName:"Baby powder",germanName:"Babypuder"},
  //   {englishName:"Wet wipes",germanName:"Feuchttücher"},
  //   {englishName:"Baby milk powder",germanName:"Milchpulver Säuglinge "},
  //   {englishName:"Waterproofs (children's)",germanName:"Regenkleidung für Kinder"},
  //   {englishName:"Baby shampoo",germanName:"Shampoo Baby / Kinder"},
  //   {englishName:"Diapers",germanName:"Windeln "},
  //   {englishName:"Nappy rash cream",germanName:"Wundschutzcreme"},
  //   {englishName:"Pushchair / Pram",germanName:"Kinderwagen"},
  //   {englishName:"Toothbrushes (children's)",germanName:"Kinderzahnbürsten"},
  //   {englishName:"Toothpaste (children's)",germanName:"Kinderzahnpasta"},
  //   {englishName:"Baby bottles",germanName:"Babyflaschen"},
  //   {englishName:"Baby bottle sterilisor",germanName:"Babyflaschensterilisator"},
  //   {englishName:"Baby carriers",germanName:"Babytragen"},
  //   {englishName:"Trousers (children's)",germanName:"Hosen (Kinder)"},
  //   {englishName:"Underwear (children's)",germanName:"Unterwäsche (Kinder)"},
  //   {englishName:"Sweaters / Jumpers (children's)",germanName:"Pullover (Kinder)"},
  //   {englishName:"Leggings (Mädchen)",germanName:""},
  //   {englishName:"Rain ponchos",germanName:"Regenponchos"},
  //   {englishName:"Shoes (women's)",germanName:"Schuhe (Frauen)"},
  //   {englishName:"Flip flops (women's)",germanName:"Flip-flops (Frauen)"},
  //   {englishName:"Trousers (women's)",germanName:"Hosen (Frauen)"},
  //   {englishName:"Leggings (women's)",germanName:"Leggings (Frauen)"},
  //   {englishName:"Jeans (women's)",germanName:"Jeans (Frauen)"},
  //   {englishName:"Jumpers (women's)",germanName:"Pullover (Frauen)"},
  //   {englishName:"Wooly hats (women's)",germanName:"Mützen (Frauen)"},
  //   {englishName:"Gloves (women's)",germanName:"Handschuhe (Frauen)"},
  //   {englishName:"Scaves (women's)",germanName:"Schals (Frauen)"},
  //   {englishName:"Socks (women's)",germanName:"Socken (Frauen)"},
  //   {englishName:"Underwear (women's)",germanName:"Unterwäsche (Frauen)"},
  //   {englishName:"Rucksacks (women's)",germanName:"Rucksäcke (Frauen)"},
  //   {englishName:"Belts (women's)",germanName:"Gürtel (Frauen)"},
  //   {englishName:"Clothing (women's - general)",germanName:"Kleidung (Frauen - Allgemein)"},
  //   {englishName:"Pyjamas (women's)",germanName:"Pyjamas (Frauen)"},
  //   {englishName:"Coats / Jackets (women's)",germanName:"Jacken / Mantel (Frauen)"},
  //   {englishName:"Trainers (women's)",germanName:"Sportschuhen (Frauen)"},
  //   {englishName:"Shoes (men's)",germanName:"Schuhe (Männer)"},
  //   {englishName:"Trousers (men's)",germanName:"Hosen (Männer)"},
  //   {englishName:"Tracksuits (men's)",germanName:"Jogginghosen/-anzüge (Männer)"},
  //   {englishName:"Jeans (men's)",germanName:"Jeans (Männer)"},
  //   {englishName:"Jumpers / Sweatshirts (men's)",germanName:"Pullover (Männer)"},
  //   {englishName:"Pyjamas (men's)",germanName:"Pyjamas (Männer)"},
  //   {englishName:"Wooly hats (men's)",germanName:"Mützen (Männer)"},
  //   {englishName:"Gloves (men's)",germanName:"Handschuhe (Männer)"},
  //   {englishName:"T-shirts (men's)",germanName:"T-shirts (Männer)"},
  //   {englishName:"Scaves (men's)",germanName:"Schals (Männer)"},
  //   {englishName:"Socks (men's)",germanName:"Socken (Männer)"},
  //   {englishName:"Underwear (men's)",germanName:"Unterwäsche (Männer)"},
  //   {englishName:"Rucksacks (men's)",germanName:"Rucksäcke (Männer)"},
  //   {englishName:"Belts (men's)",germanName:"Gürtel (Männer)"},
  //   {englishName:"Clothing (men's - general)",germanName:"Kleidung (Männer - Allgemein)"},
  //   {englishName:"Trainers (men's)",germanName:"Sportschuhen (Männer)"},
  //   {englishName:"Flip flops (men's)",germanName:"Flip-flops (Männer)"},
  //   {englishName:"Blankets",germanName:"Decken"},
  //   {englishName:"Tarpaulin",germanName:"Abdeckplane"},
  //   {englishName:"Thermal mats",germanName:"Isomatten"},
  //   {englishName:"Garbage bags",germanName:"Müllsäcke "},
  //   {englishName:"Sleeping bags",germanName:"Schlafsäcke"},
  //   {englishName:"SIM Cards",germanName:"SIM-Karten"},
  //   {englishName:"Mobile phones / Smartphones",germanName:"Handys / Smartphones"},
  //   {englishName:"Umbrellas",germanName:"Regenschirmen"},
  //   {englishName:"Luggage / Suitcases",germanName:"Koffer / Rollkoffer"},
  //   {englishName:"Rucksacks / Backpacks",germanName:"Rücksäcke"},
  //   {englishName:"Washing stands",germanName:""},
  //   {englishName:"Bags",germanName:""},
  //   {englishName:"Room dividers",germanName:"Trennbänder"},
  //   {englishName:"Cord / string",germanName:"Bänder / Schnüre"},
  //   {englishName:"Tools",germanName:"Werkzeuge"},
  //   {englishName:"Sewing kits",germanName:"Nähzeug"},
  //   {englishName:"Women's hygiene products",germanName:""},
  //   {englishName:"Sanitary towels / products",germanName:"Damenbinden / Tampons"},
  //   {englishName:"Deodorant",germanName:"Deo"},
  //   {englishName:"Shower gel",germanName:"Duschgel (Reisegröße)"},
  //   {englishName:"Razors (disposable)",germanName:"Einwegrasierer"},
  //   {englishName:"Razors (electric)",germanName:"Elektrorasier"},
  //   {englishName:"Toothbrushes (adult)",germanName:"Zahnbürsten"},
  //   {englishName:"Moisturiser (face)",germanName:"Gesichtscreme"},
  //   {englishName:"Hair products",germanName:"Haarprodukte"},
  //   {englishName:"Q Tips",germanName:"Q Tips"},
  //   {englishName:"Body lotion ",germanName:"Bodylotion"},
  //   {englishName:"Toilet paper",germanName:"Klopapier"},
  //   {englishName:"Shaving cream",germanName:"Rasierschaum"},
  //   {englishName:"Shampoo / Conditioner",germanName:"Shampoo / Conditioner"},
  //   {englishName:"Hair brushes",germanName:"Haarbürsten"},
  //   {englishName:"Tissues",germanName:"Taschentücher"},
  //   {englishName:"Toothpaste",germanName:"Zahnpasta"},
  //   {englishName:"Toiletries (travel size)",germanName:"Hygiene-Artikel allgemein (Reisegröße)"},
  //   {englishName:"Nail kits",germanName:"Nagelscheren und -knipser"},
  //   {englishName:"Hand soap",germanName:"Handseife"},
  //   {englishName:"Hand cream",germanName:"Handcreme"},
  //   {englishName:"Lice shampoo",germanName:"Läusemittel"},
  //   {englishName:"Hygiene products / Cosmetics (other)",germanName:"Hygiene-Artikel (sonstige)"},
  //   {englishName:"Cups (paper/plastic)",germanName:"Plastik-/Pappbecher"},
  //   {englishName:"Cutlery (plastic)",germanName:"Plastikbesteck"},
  //   {englishName:"Coffee",germanName:"Kaffee"},
  //   {englishName:"Biscuits",germanName:"Kekse"},
  //   {englishName:"Milk",germanName:"Milch"},
  //   {englishName:"Muesli bars",germanName:"Müsliriegel"},
  //   {englishName:"Tea",germanName:"Tee"},
  //   {englishName:"Snacks (packaged)",germanName:"Snacks (verpackt)"},
  //   {englishName:"Sugar",germanName:"Zucker"},
  //   {englishName:"Packaged food",germanName:"Lebensmittel (verpackt)"},
  //   {englishName:"Food (other)",germanName:"Lebensmittel (sonstiges)"},
  //   {englishName:"Rice",germanName:"Reis"},
  //   {englishName:"Jam",germanName:"Marmelade"},
  //   {englishName:"Fruit",germanName:"Obst"},
  //   {englishName:"Yoghurt",germanName:"Yoghurt"},
  //   {englishName:"Pregnancy tests",germanName:"Schwangerschaftstests"},
  //   {englishName:"Painkillers ",germanName:"Schmerztabletten"},
  //   {englishName:"Thermometer",germanName:"Ohrthermometer"},
  //   {englishName:"Disinfectant",germanName:"Desinfektionsmittel"},
  //   {englishName:"Medicine products (other)",germanName:"Arztmittel (other)"},
  //   {englishName:"Toys & Games (general)",germanName:"Spielzeuge (allgemein)"},
  //   {englishName:"Lego",germanName:"Lego"},
  //   {englishName:"Basketball hoop",germanName:"Basketballkorb"},
  //   {englishName:"Rossmann/DM vouchers",germanName:"Rossmann-/DM-Gutscheine"},
  //   {englishName:"Vouchers (supermarket)",germanName:"Supermarketgutscheine"},
  //   {englishName:"Clothing vouchers",germanName:"Bekleidungsgutscheine"},
  //   {englishName:"BVG Tickets",germanName:"BVG-Tickets"},
  //   {englishName:"Sellotape / masking tape",germanName:"Kreppband / Maler-kreppband"},
  //   {englishName:"Paper (printing)",germanName:"Druckpapier"},
  //   {englishName:"IKEA Bags",germanName:"IKEA-Taschen"},
  //   {englishName:"Boxes",germanName:"Umzugskartons"},
  //   {englishName:"Furniture (general)",germanName:"Möbel (Allgemein)"},
  //   {englishName:"Clothes driers",germanName:"Wäschetrockner"},
  //   {englishName:"Dictionaries",germanName:"Wörterbücher"}
  // ]
  // catObjects.forEach(function(cat) {
  //   var category = Category(cat);
  //   category.save(function (err) {
  //     if (err) // ...
  //     console.log('meow');
  //   });
  // });

  // var center = Center({
  //   name: "Help Center",
  //   address: "Paul-Lincke-Ufer 39, Berlin",
  //   longitude: -42.321,
  //   latitude: 23.323,
  //   email: "charity@cross.red",
  //   description: "A test charity",
  //   phone_number: "+47 1234321234"
  // })
  // center.save(function (err) {
  // 	if (err) // ...
  // 	console.log(err);
  // });

  // var item1 = Item({
  //   name: "Help Center",
  //   quantity: 1,
  //   due_date: Date.now(),
  //   phone_number: "+47 1234321234",
  //   center: center._id
  // })
  // item1.save(function (err) {
  // 	if (err) // ...
  // 	console.log(err);
  // });

  // var item2 = Item({
  //   name: "Help Center",
  //   quantity: 2,
  //   due_date: Date.now(),
  //   phone_number: "+47 1234321234",
  //   center: center._id
  // })
  // item2.save(function (err) {
  // 	if (err) // ...
  // 	console.log(err);
  // });

  res.send('Another dumb entry created');
});


module.exports = router;
