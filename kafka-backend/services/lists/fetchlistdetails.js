var User = require("../../api/models/user");
var List = require("../../api/models/list");

function handle_request(msg, callback) {
    
    console.log("Inside fetchlistdetails");
    console.log(msg.list_id);
   
        List.find({  _id : msg.list_id  } )
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

}

exports.handle_request = handle_request;
