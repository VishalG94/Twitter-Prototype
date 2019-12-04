const Tweet = require('../../api/models/tweet');
const User = require('../../api/models/user');

function handle_request(msg, callback) {
    console.log("Inside view tweet kafka");
    var id = msg.id
    console.log(id)

    Tweet.findOne({ _id: id }).sort({ time: -1 })
        .populate('owner')
        .populate('retweetdata')
        .populate({
            path: 'retweetdata',
            populate: {
                path: 'owner'
            }
        })
        .then((doc) => {
            console.log("Tweet res " + doc)
            callback(null, JSON.stringify(doc))

        }).catch((err) => {
            console.log("get view tweet kafka Error! " + err)
            callback(null, "error")
        })
};
exports.handle_request = handle_request;