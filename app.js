var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var Campground = require("./models/campground");
var Comment = require("./models/comments");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp_V10", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

app.use(express.static(__dirname+"/public"));

var passport = require("passport");
var localStrategy = require("passport-local");

var User = require("./models/user");

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var authRoutes = require("./routes/index");

//flash configuration should be before passport config.
var flash = require("connect-flash");
app.use(flash());

//passport configuration
//express-session
app.use(require("express-session")({//there is always a function in app.use
    secret:"say my name",
    resave:false,
    saveUninitialized:false
}));
//passport
app.use(passport.initialize());
app.use(passport.session());
//passport-local-mongoose
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//this is the middleware function which passes currentUser object to rendered template in every route so that u don't mannulay have to add. PS:currentUser gets the req.user object 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.errorAlert = req.flash("error");
    res.locals.successAlert = req.flash("success");
    next();
});

// var seedDB = require("./seeds");
// seedDB();

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);


app.listen(3000, function(req,res){
    console.log("server started at port 3000: ");
})

//take the example in SHOW section
//we want to render the info associated to that id and we find that id
//by the Campgrounds.findByID....but what to deo next??
//so we use callback which says that...when u find that id(ie. on success)
//run this function that states to render the show page

//one note about REQUESTS..
//each req. also has the session details containing information about user credentials