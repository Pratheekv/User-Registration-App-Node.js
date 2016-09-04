var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./user_model.js');
mongoose.connect('mongodb://127.0.0.1/test');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',function (req, res){

    var db = mongoose.createConnection('mongodb://127.0.0.1/test');

	db.on('error', console.error);
	db.once('open', function() {

			var newUser = new User(req.body);

				User.findOne({'username': newUser.username}, function (err, user) {
				  if (err) {
				     console.log(err.name);
				     return;
				  }
				  if (user){

				    console.log('User exists '+newUser.username);
				    return;
				  
				  }else {
				  
				  	User.findOne({'email': newUser.email}, function (err, user) {
						  if (err) {
						     console.log(err.name);
						     return;
						  }
						  if (user){
						    console.log('email exists '+newUser.email);
						    return;
						  }else{
						  	
						  	newUser.save(function(err, newUser) {
							  if (err) return console.error(err);
							  console.dir(newUser);
							
							});
						  }

						});
				  }
			
			});
			});


		res.redirect('/')
});
module.exports = router;
