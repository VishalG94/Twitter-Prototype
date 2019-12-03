var Tweet = require("../../models/tweet");
var User = require("../../models/user");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();
let dateformat = require('dateformat')

router.post("/profileview", function (req, res) {
    console.log("Inside increamentview");

    var email = req.body.email;
    console.log(email)
    // var profileviews = req.body.views;
    console.log("Data " +email)
    var now = new Date()
    var today = dateformat(now, 'yyyy-mm-dd')
    User.findOneAndUpdate({ email: email }, { $push: { "profileviews": today } }, { new: true })
        .then((doc) => {
            console.log("Profile view checked successfully")
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });
            res.end("successfully increment the profile views");

        }).catch((e) => {
            console.log("Error " + e)
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Profile Views Unsuccessful");
        })
});

module.exports = router