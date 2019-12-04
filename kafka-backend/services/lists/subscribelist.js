var User = require("../../api/models/user");
var List = require("../../api/models/list");

function handle_request(msg, callback) {
    
    console.log("Inside Subscribe lists");
    console.log(msg);

    User.findOne({ email: msg.email }).then((doc) => {        
        
        List.findOneAndUpdate({  _id : msg.list_id  } ,
        { 
            $push : 
                    { subscribers : doc._id }
        }).then((result1) => {                
                callback(null,"Success")
            }).catch((err) => {
                console.log("Inside subscribe list error " + err)
                console.log(err)
                callback(null,"error")
            })

    }).catch((err) => {        
        callback(null,"post Subscribe lists failed ")
    })

}

exports.handle_request = handle_request;
