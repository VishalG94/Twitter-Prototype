var User = require("../../api/models/user");
var List = require("../../api/models/list");
var Tweet = require("../../api/models/tweet");

function handle_request(msg, callback) {
    
    console.log("Inside fetchlisttweets");
    var email = msg.email
    var list_id = msg.list_id
    console.log(email)
    console.log(list_id)

   User.findOne({ email: email  }).then((doc) => {

        List.findOne({_id : list_id }).then((doc) => {
            console.log("Document of list ");
            console.log(doc);
            Tweet.find({ owner: { $in: doc.members } })
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
                    callback(null,result1)
    
                }).catch((err) => {
                    console.log("Inside tweet find error " + err)
                    console.log(err)
                    
                })    
        }).catch((err) => {
            console.log("get fetchtweets Error! " + err)
            throw err            
        })            
        }).catch((err) => {
            console.log("Error inside fetchlisttweets " + err)
            throw err            
        })     

}

exports.handle_request = handle_request;
