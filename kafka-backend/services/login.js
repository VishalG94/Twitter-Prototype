const bcrypt = require('bcrypt');
var Urcs = require("../api/models/urcs");
var config = require('../config/setting');
var jwt = require('jsonwebtoken');
var passport = require('passport');

require('../config/passport')(passport);

function handle_request(msg, callback){
    console.log("in login kafka");
    console.log(msg);
    Urcs.findOne({ email: msg.email })
        .exec()
        .then(result => {
            if (bcrypt.compareSync(msg.password, result.password)) {
                var token = jwt.sign({email:msg.email}, config.secret, {
                    expiresIn: 10080 // in seconds
                });
                callback(null,{ success: true, token: 'JWT ' + token, type:result.type });
            } else {
               callback(null,"Invalid Login")
            }
        })
        .catch(err => {
            console.log(err);
            callback(null,"Invalid Login")
        })
}

exports.handle_request = handle_request;