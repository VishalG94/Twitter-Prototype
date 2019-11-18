'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./setting');
var twitter = require("../api/models/Tweet");
var con = require("../sql/sqlpool");


// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        Urcs.findOne({email: jwt_payload.email}, function (res) {
            var user = res;
            callback(null, user);
        }, function (err) {
            return callback(err, false);
        });
    }));
};


//chmod 775