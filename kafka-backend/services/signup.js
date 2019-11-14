const bcrypt = require('bcrypt');
var Urcs = require("../api/models/urcs");
var mongoose = require("mongoose");
var config = require('../config/setting');
var jwt = require('jsonwebtoken');
var passport = require('passport');

require('../config/passport')(passport);

function handle_request(msg, callback) {
    console.log("in signup kafka");
    console.log(msg);
    let type_userowner = 0;
    if (msg.type === 'user') {
        type_userowner = 1
    } else {
        type_userowner = 2
    }
    Urcs.findOne({ email: msg.email })
    .exec()
    .then(ans => {
        if(ans){
            callback(null,"user alredy exists")
        }else{
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(msg.password, salt, function (err, hash) {
                    const urcs = new Urcs({
                        _id: new mongoose.Types.ObjectId(),
                        name: msg.username,
                        password: hash,
                        email: msg.email,
                        resname: msg.resname,
                        reszip: msg.reszip,
                        type: type_userowner
                    });
                    urcs
                        .save()
                        .then(result => {
                            console.log(result);
                            var token = jwt.sign({ email: msg.email }, config.secret, {
                                expiresIn: 10080 // in seconds
                            });
                            callback(null, { success: true, token: 'JWT ' + token });
                        })
                        .catch(err => {
                            console.log(err);
                            callback(null, "Error in kafka-backend");
                        })
                });
            });
        }
    })
    
}

exports.handle_request = handle_request;