var User = require("../../api/models/user");
var List = require("../../api/models/list");

function handle_request(msg, callback) {
    
    console.log("Inside fetchSubscribedlists");
    var email = msg.email
    console.log(email)

     User.findOne({ email: email }).then((doc) => {        

        List.find({  subscribers : { $in : doc._id  }  }  )
            .populate('owner')
            .populate('members')
            // .populate('first_name')
            .exec()
            .then((result1) => {
                console.log(result1)
                callback(null,result1)

            }).catch((err) => {
                console.log("Inside tweet find error " + err)
                console.log(err)
                callback(null,"error")
            })

    }).catch((err) => {
        console.log("get fetchtweets Error! " + err)
        callback(null,"error")
    })

}

exports.handle_request = handle_request;
