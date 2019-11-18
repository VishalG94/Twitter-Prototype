const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    text : {type: String, required: true},
    image : String,
    owner : { type: String, required: true },
    retweet : [],
    likes : [],
    time : { type : Date, default: Date.now } ,
    like : Number,
    retweetFlag :  Boolean,
    reply : [
        {
            user_id : String,
            comment : String
        }
    ],
    retweetdata : []
})

module.exports = mongoose.model('tweet', tweetSchema);