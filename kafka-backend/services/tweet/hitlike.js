const Tweet = require('../../api/models/tweet');
const User = require('../../api/models/user');

function handle_request(msg, callback) {
    console.log("Inside hitlike kafka");

    var tweetid = req.body.tweetid;
    var email = req.body.email;

    console.log("Data " + tweetid + email)

    User.findOne({ email: email })
        .then(result => {

            if (req.body.flag == 0) {
                console.log("inside liked")
                Tweet.findOneAndUpdate({ _id: tweetid }, { $push: { "likes": result._id } }, { new: true })
                    .then((doc) => {
                        console.log("Tweet is liked")
                        callback(null, JSON.stringify(doc))

                    }).catch((e) => {
                        callback(null, "error")
                    })
            } else {
                console.log("inside unliked")
                Tweet.findOneAndUpdate({ _id: tweetid }, { $pull: { "likes": result._id } }, { new: true })
                    .then((doc) => {
                        console.log("Tweet is unliked")
                        callback(null, JSON.stringify(doc))

                    }).catch((e) => {
                        callback(null, "error")
                    })
            }

        }).catch((e) => {
            callback(null, "error")
        })
};
exports.handle_request = handle_request;