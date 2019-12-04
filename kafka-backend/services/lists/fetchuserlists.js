var User = require("../../api/models/user");
var List = require("../../api/models/list");

function handle_request(msg, callback) {
    
    console.log("Inside fetch User lists");
    var username = msg.username
    console.log(username)

    User.findOne({ username: username }).then((doc) => {        
        console.log("Inside fetch lists"+doc._id)
        List.find({  owner : doc._id  } )
            .populate('owner')
            .populate('members')
            // .populate('first_name')
            .exec()
            .then((result1) => {
                console.log("Tweet res " + result1)
                callback(null,result1)
            }).catch((err) => {
                console.log("Inside tweet find error " + err)
                console.log(err)
                callback(null,"error")
            })

    }).catch((err) => {
        console.log("get fetchtweets Error! " + err)
        callback(null,"get fetchlists failed ")
    })

}

exports.handle_request = handle_request;
