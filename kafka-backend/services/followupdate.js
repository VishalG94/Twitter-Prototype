const User = require('../api/models/user')
var mongoose = require('mongoose');
// var crypt = require("../../Backend/crypt");
var _id = mongoose.Types.ObjectId()
function handle_request(msg, callback) {
    console.log("Inside Update Post Request\n");
    console.log(msg);
        User.findOneAndUpdate({ email: msg.following },
            {
                $push: 
                    { following: _id }
                
            }, { new: true }).then((docs) => {
                console.log("In Update Profile Query");
                if (!docs) {
                    console.log("Unable to update the data");
                    callback(null,"Unable to update the data");
                } else {    
                    console.log("Successful updated");
                    console.log("Document Updated : ", docs);
                    callback(null,docs);

                }

            });
}

exports.handle_request = handle_request;