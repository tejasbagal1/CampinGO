var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middlewareObj = require("../middleware");


//=======COMMENT ROUTES==================================================

router.get("/campgrounds/:id/comments/new",middlewareObj.isLoggedIn, function(req,res){//this is just protecting the page
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new.ejs", {campground:foundCampground});
        }
    });
    
});

router.post("/campgrounds/:id/comments", middlewareObj.isLoggedIn,function(req,res){//we protect route also so that one cant accesss the form even with the postman
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment, function(err,newComment){
                if(err){
                    console.log(err)
                }else{
                    console.log("New comment added by the user");
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    req.flash("success", "Comment Added!")
                    res.redirect("/campgrounds/"+req.params.id);
                }
            });
            
        }
    })
});

router.get("/campgrounds/:id/comments/:comment_id/edit",  middlewareObj.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            console.log(err);
        }else{
            res.render("comments/edit.ejs",{C_id:req.params.id, comment:foundComment});
        }
    })
});

router.put("/campgrounds/:id/comments/:comment_id",  middlewareObj.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
        if(err){
            console.log(err)
        }else{
            req.flash("success","Comment Edited!")
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
}); 

router.delete("/campgrounds/:id/comments/:comment_id",  middlewareObj.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err)
        }else{
            req.flash("success","Deleted your comment!")
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})


module.exports = router;