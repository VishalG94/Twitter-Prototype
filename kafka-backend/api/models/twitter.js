const mongoose = require("mongoose");

const urcsSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    test : String,
    image : String,
    time : { type : Date, default: Date.now } ,
    like : Number,
    reply : [
        {
            user_id : String,
            comment : String
        }
    ]
})

module.exports = mongoose.model('twitter', urcsSchema);