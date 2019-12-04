const Tweet = require('../../api/models/tweet');
const User = require('../../api/models/user');

function handle_request(msg, callback) {

    console.log("Inside fetchtweets kafka");
    var email = msg.email
    console.log(email)

    User.findOne({ email: email }).then((doc) => {

        // console.log(doc + " Name" + doc.first_name + "fetchtweets success!" + doc.following[0])
        console.log(doc);
        Tweet.find({ owner: { $in: doc.following } }).sort({ time: -1 })
            .populate('owner')
            .populate('retweetdata')
            .populate({
                path: 'retweetdata',
                populate: {
                    path: 'owner'
                }
            })
            // .populate('first_name')
            .exec()
            .then((result1) => {
                console.log("Tweet res " + result1)
                callback(null, JSON.stringify(result1))

            }).catch((err) => {
                console.log("Inside tweet find error kafka" + err)
                console.log(err)
                callback(null, "error")
            })

    }).catch((err) => {
        console.log("get fetchtweets Error kafka! " + err)
        callback(null, "error")
    })

};
exports.handle_request = handle_request;