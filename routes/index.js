var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');
const localStrategy = require('passport-local');

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/profile', isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({username: req.session.passport.user});
  res.render('profile', {user});
});

// submit register request to create user
router.post('/register', function(req, res, next) {
  const data = new userModel({
    fullName: req.body.fullName,
    contact: req.body.contact,            // getting data from input tags in register page to save in db schema, input tag name must match req.body.{tag_naam}
    email: req.body.email,
    password: req.body.password
  })
  userModel.register(data, req.body.password)
.then(function(){
  passport.authenticate("local")(req, res, function(){
    res.redirect('/profile');
  })
})  
});

router.post('/login', passport.authenticate("local",{
  failureRedirect: "/",
  successRedirect: "/profile"
}), function(req, res, next) {
});

router.get("/logout", function(req, res, next){
  req.logOut(function(err){
    if (err) {return next(err);}
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

module.exports = router;