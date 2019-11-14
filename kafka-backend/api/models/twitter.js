const mongoose = require("mongoose");

const urcsSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('twitter', urcsSchema);