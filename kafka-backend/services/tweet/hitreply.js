const Tweet = require('../../api/models/tweet');
const User = require('../../api/models/user');

function handle_request(msg, callback) {
    console.log("Inside hitreply");

    var tweetid = msg.tweetid;
    var commentowner = msg.email;
    var comment = msg.text;

    console.log("Body " + tweetid + comment + commentowner)

    var replyVar = { userid: commentowner, comment: comment };

    Tweet.findOneAndUpdate({ _id: tweetid }, { $push: { reply: replyVar } }).then(result => {
        console.log(result);
        callback(null, result)
    }).catch(error => {
        console.log("error occured" + error);
        callback(null, "error")
    });
};
exports.handle_request = handle_request;