var Tweet = require("../../models/tweet");
var User = require("../../models/user");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();

router.post("/hitreply", function (req, res) {
    console.log("Inside hitreply");

    var tweetid = req.body.tweetid;
    var commentowner = req.body.email;
    var comment = req.body.text;


    console.log("Body " + tweetid + comment + commentowner)

    var replyVar = { userid: commentowner, comment: comment };

    Tweet.findOneAndUpdate({ _id: tweetid }, { $push: { reply: replyVar } }).then(result => {
        console.log(result);
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end(JSON.stringify(result));
    }).catch(error => {
        console.log("error occured" + error);
        res.writeHead(400, {
            "Content-Type": "text/plain"
        });
        res.end("Unsuccessful hitreply");
    });
});

module.exports = router