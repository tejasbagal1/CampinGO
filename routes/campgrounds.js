var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middlewareObj = require("../middleware");

// const user = require("../models/user");

router.get("/campgrounds", function(req,res){
    Campground.find({}, function(err, allCampgrounds){//.find method return the array of objects
        if(err){
            console.log("Not found");
        }else{
            res.render("campgrounds/index.ejs", {campgrounds:allCampgrounds});
        }
    })
    
});

//======NEW============================================

router.get("/campgrounds/new",  middlewareObj.isLoggedIn,function(req,res){
    res.render("campgrounds/new.ejs");
});

//======CREATE============================================

router.post("/campgrounds",  middlewareObj.isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var user = {
        id:req.user._id,
        username:req.user.username
    }
    var newcampground = {name:name,img:image,user:user,desc:desc};
    Campground.create(newcampground, function(err, newlycreatedcampground){ //theory behind these functions..read at bottom
        if(err){
            console.log("enter valid one");
        }else{
            res.redirect("/campgrounds");
        }
    });
    
});

//======SHOW===========================================

router.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){  
        //very IMPORTANT(Read whole line..). when we find the CG by the id, we get array of comments having the objects id's as we have defined it in CGschema,so to put in actual content of the comment not just theid, we use this .populate(entity_to_populate).exec(callback)
        if(err){
            console.log("No match with the id");
            console.log(err);
            res.redirect("back");
        }else{
            res.render("campgrounds/show.ejs",{campG:foundCampground});
        }
    });
    
});
//=====================EDIT=====================================
//edit form
router.get("/campgrounds/:id/edit",middlewareObj.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/edit.ejs",{campground:foundCampground});
        }
    })
    //every route searches in views folder first
});


//keep the below code commented!

//update put route......Can be done like this..but dont do like that!!!

// router.put("/campgrounds/:id", function(req,res){
//     Campground.findById(req.params.id, function(err, foundCampground){
//         if(err){
//             console.log(err)
//         }else{
//             foundCampground.name = req.body.name;
//             foundCampground.image = req.body.image;
//             foundCampground.desc = req.body.desc;
//             foundCampground.save();
//             res.redirect("/campgrounds/"+req.params.id);
//         }
//     })
// });
router.put("/campgrounds/:id", middlewareObj.checkCampgroundOwnership ,function(req,res){
    console.log(req.body);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground ,function(err, foundCampground){
        if(err){
            console.log(err)
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

router.delete("/campgrounds/:id",middlewareObj.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/campgrounds");
        }
    })
})


module.exports = router;