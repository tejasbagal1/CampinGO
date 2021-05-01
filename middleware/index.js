var Campground = require("../models/campground");
var Comment = require("../models/comments");

var middlewareObj = {};


middlewareObj.checkCampgroundOwnership = function (req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.flash("error", "Can't find the specified Campground!")
            }else{
                if(foundCampground.user.id.equals(req.user._id)){//we use this cause ist one is object and second one is the string so == won't work
                    next()
                }else{
                    // res.send("U are not autharized to do this shit!!")
                    req.flash("error", "You are NOT Authorized to do that!")
                    res.redirect("back");//important shit takes u from where u came!
                }
            }
        })
    }else{
        req.flash("error", "Login First!")
        res.redirect("/login");
    }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.send("cannot find the campground")     
            }else{
                if(foundComment.author.id.equals(req.user._id)){//we use this cause ist one is object and second one is the string so == won't work
                    next()
                }else{
                    // res.send("U are not autharized to do this shit!!")
                    req.flash("error", "You are NOT Authorized to do that!")
                    res.redirect("back");//important shit takes u from where u came!
                }
            }
        })
    }else{
        req.flash("error", "Login First!")
        res.redirect("/login");
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{// use flash line before login!!
        req.flash("error", "Please login first!!");//its just declared u have to handle it in the redirected ROUTE!
        res.redirect("/login");
    }
}

module.exports = middlewareObj;
