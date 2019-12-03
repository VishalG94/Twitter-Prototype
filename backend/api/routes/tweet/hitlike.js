var Tweet = require("../../models/tweet");
var User = require("../../models/user");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();

router.post("/hitlike", function (req, res) {
    console.log("Inside hitlike");

    var tweetid = req.body.tweetid;
    var email = req.body.email;
    console.log("Data " + tweetid + email)

    // kafka.make_request('hitlike', req.body, function (err, results) {
    //     console.log('in result');

    //     if (err || results === "error") {
    //         console.log("Inside err");
    //         res.writeHead(400, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Unsuccessful hitlike");
    //     } else {
    //         console.log("Inside else");
    //         res.writeHead(200, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Successful hitlike");
    //     }
    // });


    User.findOne({ email: email })
        .then(result => {

            if (req.body.flag == 0) {
                console.log("inside liked")
                Tweet.findOneAndUpdate({ _id: tweetid }, { $push: { "likes": result._id } }, { new: true })
                    .then((doc) => {
                        console.log("Tweet is liked")
                        res.writeHead(200, {
                            "Content-Type": "text/plain"
                        });
                        res.end("successfully liked the tweet");

                    }).catch((e) => {
                        res.writeHead(400, {
                            "Content-Type": "text/plain"
                        });
                        res.end("Unsuccessfully liked the tweet");
                    })
            } else {
                console.log("inside unliked")
                Tweet.findOneAndUpdate({ _id: tweetid }, { $pull: { "likes": result._id } }, { new: true })
                    .then((doc) => {
                        console.log("Tweet is unliked")
                        res.writeHead(200, {
                            "Content-Type": "text/plain"
                        });
                        res.end("successfully unliked the tweet");

                    }).catch((e) => {
                        res.writeHead(400, {
                            "Content-Type": "text/plain"
                        });
                        res.end("Unsuccessfully unliked the tweet");
                    })
            }

        }).catch((e) => {
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful user find");
        })
});

module.exports = router