var Tweet = require("../../models/tweet");
var User = require("../../models/user");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();

router.post("/increamentview", function (req, res) {
    console.log("Inside increamentview");

    var tweetid = req.body.tweetid;
    var views = req.body.views;
    console.log("Data " + views + tweetid)

    Tweet.findOneAndUpdate({ _id: tweetid }, { $push: { "views": "1" } }, { new: true })
        .then((doc) => {
            console.log("Tweet is increamented successfully")
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });
            res.end("successfully increamentview the tweet");

        }).catch((e) => {
            console.log("Error " + e)
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessfully increamentview");
        })

    // kafka.make_request('increamentview', req.body, function (err, results) {
    //     console.log('in result');

    //     if (err || results === "error") {
    //         console.log("Inside err");
    //         res.writeHead(400, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Unsuccessful increamentview");
    //     } else {
    //         console.log("Inside else");
    //         res.writeHead(200, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Successful increamentview");
    //     }
    // });

});

module.exports = router