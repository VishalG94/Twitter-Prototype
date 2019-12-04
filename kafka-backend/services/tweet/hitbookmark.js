const Tweet = require('../../api/models/tweet');
const User = require('../../api/models/user');

function handle_request(msg, callback) {
    var tweetid = msg.tweetid;
    var email = msg.email;
    console.log("Data " + tweetid + email)

    User.findOne({ email: email })
        .then(result => {
            if (msg.flag == 0) {
                console.log("inside bookmarked")
                Tweet.findOneAndUpdate({ _id: tweetid }, { $push: { "bookmarks": result._id } }, { new: true })
                    .then((doc) => {
                        console.log("Tweet is bookmarked")
                        callback(null, doc)
                    }).catch((e) => {
                        callback(null, "error")
                    })
            } else {
                console.log("inside unbookmarked")
                Tweet.findOneAndUpdate({ _id: tweetid }, { $pull: { "bookmarks": result._id } }, { new: true })
                    .then((doc) => {
                        console.log("Tweet is unbookmarked")
                        callback(null, doc)
                    }).catch((e) => {
                        callback(null, "error")
                    })
            }
        }).catch((e) => {
            callback(null, "error")
        })
};
exports.handle_request = handle_request;