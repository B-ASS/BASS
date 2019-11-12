var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var passport = require('../config/passport.js');

router.get('/', function(req, res) {
   res.render('home/index');
 });

 router.get('/about', function(req, res) {
   res.render('home/about');
 });

 router.get('/petlist', function (req, res){
	res.render('home/petlist');
  });

  router.get('/detail', function (req, res){
	res.render('home/detail');
  });

 router.get('/register', function(req, res) {
   res.render('home/register');
 });


router.get('/login', function (req,res) {
  res.render('login/login', {
    // email:req.flash("email")[0],
    loginError:req.flash('loginError'),
    loginMessage:req.flash('loginMessage')
  });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/index',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash("postsMessage", "Good-bye, have a nice day!");
  res.redirect('/');
});


module.exports = router;
