const bcrypt = require('bcrypt');
//var Urcs = require("../api/models/twitter");
var config = require('../config/setting');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var con = require("../sql/sqlpool");

require('../config/passport')(passport);

function handle_request(msg, callback) {
    console.log("in login kafka");
    console.log(msg);
    let sql = 'SELECT * from user where email="' + msg.email + '"';
    con.query(sql, (err, result) => {
        if (err || !result.length) {
            callback(null, "Invalid Login")
        } else {
            if (bcrypt.compareSync(msg.password, result[0].password)) {
                //dostuff(true, result[0].type);
                var token = jwt.sign({ email: result[0].email }, config.secret, {
                    expiresIn: 10080 // in seconds
                });
                callback(null, { success: true, token: token , username: result[0].username });
            
            } else {
                callback(null, "Invalid Login")
            }
        }
    });
    // Urcs.findOne({ email: msg.email })
    //     .exec()
    //     .then(result => {
    //         if (bcrypt.compareSync(msg.password, result.password)) {
    //             var token = jwt.sign({email:msg.email}, config.secret, {
    //                 expiresIn: 10080 // in seconds
    //             });
    //             callback(null,{ success: true, token: 'JWT ' + token, type:result.type });
    //         } else {
    //            callback(null,"Invalid Login")
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         callback(null,"Invalid Login")
    //     })
}

exports.handle_request = handle_request;