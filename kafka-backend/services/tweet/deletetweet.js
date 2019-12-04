const Tweet = require('../../api/models/tweet');
const User = require('../../api/models/user');

function handle_request(msg, callback) {
    console.log("Inside deletetweet kafka");
    var tweetid = msg.tweetid;

    console.log("Body " + tweetid)

    Tweet.remove({ _id: tweetid }, { single: true })
        .then((doc) => {
            console.log("Tweet delete success", doc);
            Tweet.deleteMany({ retweetdata: tweetid }).then((doc) => {
                console.log("All retweets deleted")
                callback(null, JSON.stringify(doc))
            })

        }).catch((e) => {
            console.log("Delete tweet error" + e)
            callback(null, "error")
        })
};
exports.handle_request = handle_request;