//there was need to make this file cause our previous campground schema was defined without 
//the comments so we remove all the campgrounds with previous schema and create the new ones.
//comment schema was also created ans added to the campground model



var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");
var User = require("./models/user");
var arr = [
    {
        name:"shivneri",
        img:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg",
        desc:"Shivaji maharaj born here"
    },
    {
        name:"purandar",
        img:"https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020_1280.jpg",
        desc:"Afjal khan ki MKB"
    },
    {
        name:"Kondhana",
        img:"https://cdn.pixabay.com/photo/2016/11/21/14/31/vw-bus-1845719_1280.jpg",
        desc:"Garh aala pan Sinha gela!;("
    }
];

var comment = {
    text:"!Jay Bhavani Jay Shivaji!",
    author:"jony"
}



function seedDB(){
    Comment.remove({}, function(err){
        if(err){
            console.log(err)
        }else{
            console.log("removed all!!");
            // arr.forEach(function(campground){
            //     Campground.create(campground, function(err,createdCampground){
            //         if(err){
            //             console.log(err);
            //         }else{
            //             console.log("campground created");
            //             Comment.create(comment, function(err,addedComment){
            //                 if(err){
            //                     console.log(err);
            //                 }else{
            //                     createdCampground.comments.push(addedComment);
            //                     createdCampground.save(function(err,finalcampground){
            //                         if(err){
            //                             console.log(err);
            //                         }else{
            //                             console.log("campground added with the comment");
            //                         }
            //                     });
            //                 }
            //             });
            //         }
            //     })
            // });
        }
    });
}

module.exports = seedDB;  //returning funtion seedDB as a function using 