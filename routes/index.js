var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

//======INDEX============================================

router.get("/", function(req,res){
    res.render("landing.ejs");
});


//=========AUTH ROUTES========================================

router.get("/register", function(req,res){
    res.render("Auth/register.ejs");
});

router.post("/register", function(req,res){//register and authenticate after successful registration
    User.register(new User({username:req.body.username}), req.body.password, function(err,user){//register is the method provided by passport-local-mongoose
        if(err){
            req.flash("error", err.message);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to CampinGO "+user.username)
                res.redirect("/campgrounds");
            })
        }
    })
});

router.get("/login", function(req,res){
    res.render("Auth/login.ejs");
});

//app.post("/login", middleware, callback)//and the middleware checks for the authentication
router.post("/login", passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}), function(req,res){
    //just Empty! ('-')
});

router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged out Successfully!")
    res.redirect("/");
});


router.get("/about", function(req,res){
    res.render("others/about.ejs");
});

router.get("/contact", function(req,res){
    res.render("others/contact.ejs");
});

module.exports = router;