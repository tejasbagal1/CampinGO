var mongoose = require("mongoose");
var Comment = require("./comments");
var campSchema = mongoose.Schema({
    name:String,
    img:String,
    desc:String,
    user:{ //author
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId, //saving ids of comments
            ref:"Comment"  //this is the reference model
        }
    ]
});

module.exports = mongoose.model("Campground", campSchema);