const Tweet = require('../../api/models/tweet');
const User = require('../../api/models/user');

function handle_request(msg, callback) {
    console.log(req.body);
    console.log(req.body.email);

    User.findOne({ email: req.body.email })
        .then(result => {
            console.log(result);
            const tweet = new Tweet({
                text: req.body.text,
                owner: result._id,
                retweetdata: req.body.tweetid,
                retweetFlag: true
            });

            tweet.save()
                .then(result1 => {
                    console.log("Tweet successfull! " + result1);
                    Tweet.findOneAndUpdate({ _id: req.body.tweetid }, { $push: { "retweet": result._id } }, { new: true }).then(result2 => {
                        console.log("Updated origial tweet successfully! " + result2);
                        callback(null, result2)
                    }).catch(error => {
                        console.log("error occured in update tweet" + error);
                        callback(null, "error")
                    });
                    callback(null, result1);
                })
                .catch(err => {
                    console.log("Error occured in write tweet" + err);
                    callback(null, "error")
                })
        })
};
exports.handle_request = handle_request;