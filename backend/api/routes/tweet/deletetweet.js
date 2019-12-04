var Tweet = require("../../models/tweet");
var User = require("../../models/user");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();

router.post("/deletetweet", function (req, res) {
    console.log("Inside deletetweet");

    var tweetid = req.body.tweetid;

    console.log("Body " + tweetid)

    Tweet.remove({ _id: tweetid }, { single: true })
        .then((doc) => {
            console.log("Tweet delete success", doc);
            Tweet.deleteMany({ retweetdata: tweetid }).then((doc) => {
                console.log("All retweets deleted")
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successfully deleted Tweet");
            })

        }).catch((e) => {
            console.log("Delete tweet error" + e)
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessfully deleted Tweet");
        })

    // kafka.make_request('deletetweet', req.body, function (err, results) {
    //     console.log('in result');

    //     if (err || results === "error") {
    //         console.log("Inside err");
    //         res.writeHead(400, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Unsuccessful deletetweet");
    //     } else {
    //         console.log("Inside else");
    //         res.writeHead(200, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Successful deletetweet");
    //     }
    // });
});

module.exports = router