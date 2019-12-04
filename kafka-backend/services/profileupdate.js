const User = require('../api/models/user')
// var crypt = require("../../Backend/crypt");
const bcrypt = require('bcrypt')

function handle_request(msg, callback) {
    console.log("Inside Update Post Request\n");
    console.log(msg);
    let password = msg.password;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(msg.password, salt, function (err, hash) {
        User.findOneAndUpdate({ email: msg.email },
            {
                $set: {
                    first_name: msg.first_name,
                    last_name: msg.last_name,
                    password: hash,
                    zipcode : msg.zipcode
                }
            }, { new: true }).then((docs) => {
                console.log("In Update Profile Query");
                if (!docs) {
                    console.log("Unable to update the data");
                    callback(null,"Unable to update the data");
                } else {
                    console.log(password);
                    console.log("Successful updated");
                    console.log("Document Updated : ", docs);
                    callback(null,docs);

                }

            });
    })
})
}

exports.handle_request = handle_request;