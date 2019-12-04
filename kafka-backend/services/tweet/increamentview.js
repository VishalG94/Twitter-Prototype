const Tweet = require('../../api/models/tweet');
const User = require('../../api/models/user');

function handle_request(msg, callback) {
    console.log("Inside increamentview");

    var tweetid = msg.tweetid;
    var views = msg.views;
    console.log("Data " + views + tweetid)

    Tweet.findOneAndUpdate({ _id: tweetid }, { $push: { "views": "1" } }, { new: true })
        .then((doc) => {
            console.log("Tweet is increamented successfully")
            callback(null, doc)
        }).catch((e) => {
            console.log("Error " + e)
            callback(null, "error")
        })
};
exports.handle_request = handle_request;