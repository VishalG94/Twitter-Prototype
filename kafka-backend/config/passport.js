'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./setting');
var con = require("../sql/sqlpool");


// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };

    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        let sql = 'SELECT * from user where email="' + jwt_payload.email + '"';
        con.query(sql, (err, result) => {
            if (err || !result.length) {
                callback(null, "Invalid Login")
            } else {
                var user = result[0].username;
                callback(null, user);
            }
        }
            // twitter.findOne({email: jwt_payload.email}, function (res) {
            //     var user = res;
            //     callback(null, user);
            // }
            , function (err) {
                return callback(err, false);
            });
    }));
};


//chmod 775

// con.query(sql, (err, result) => {
//     if (err || !result.length) {
//         callback(null, "Invalid Login")
//     } else {
//         if (bcrypt.compareSync(req.body.password, result[0].password)) {
//             //dostuff(true, result[0].type);
//             var token = jwt.sign({ email: msg.email }, config.secret, {
//                 expiresIn: 10080 // in seconds
//             });
//             callback(null, { success: true, token: 'JWT ' + token, username: result[0].username });
//         } else {
//             callback(null, "Invalid Login")
//         }
//     }
// }