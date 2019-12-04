var Tweet = require("../../models/tweet");
var User = require("../../models/user");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();

router.post("/hitbookmark", function (req, res) {
    console.log("Inside hitbookmark");

    var tweetid = req.body.tweetid;
    var email = req.body.email;

    console.log("Data " + tweetid + email)

    User.findOne({ email: email })
        .then(result => {

            if (req.body.flag == 0) {
                console.log("inside bookmarked")
                Tweet.findOneAndUpdate({ _id: tweetid }, { $push: { "bookmarks": result._id } }, { new: true })
                    .then((doc) => {
                        console.log("Tweet is bookmarked")
                        res.writeHead(200, {
                            "Content-Type": "text/plain"
                        });
                        res.end("successfully bookmarked the tweet");

                    }).catch((e) => {
                        res.writeHead(400, {
                            "Content-Type": "text/plain"
                        });
                        res.end("Unsuccessfully bookmarked the tweet");
                    })
            } else {
                console.log("inside unbookmarked")
                Tweet.findOneAndUpdate({ _id: tweetid }, { $pull: { "bookmarks": result._id } }, { new: true })
                    .then((doc) => {
                        console.log("Tweet is unbookmarked")
                        res.writeHead(200, {
                            "Content-Type": "text/plain"
                        });
                        res.end("successfully unbookmarked the tweet");

                    }).catch((e) => {
                        res.writeHead(400, {
                            "Content-Type": "text/plain"
                        });
                        res.end("Unsuccessfully unbookmarked the tweet");
                    })
            }

        }).catch((e) => {
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful bookmark");
        })

    // kafka.make_request('hitbookmark', req.body, function (err, results) {
    //     console.log('in result');

    //     if (err || results === "error") {
    //         console.log("Inside err");
    //         res.writeHead(400, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Unsuccessful hitbookmark");
    //     } else {
    //         console.log("Inside else");
    //         res.writeHead(200, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Successful hitbookmark");
    //     }
    // });
});

module.exports = router