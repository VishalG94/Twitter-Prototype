var Tweet = require("../../models/tweet");
var User = require("../../models/user");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();


router.get("/viewtweet", function (req, res) {
    console.log("Inside fetchtweets");
    var id = req.query.id
    console.log(id)

    Tweet.findOne({ _id: id }).sort({ time: -1 })
        .populate('owner')
        .populate('retweetdata')
        .populate({
            path: 'retweetdata',
            populate: {
                path: 'owner'
            }
        })
        .then((doc) => {

            // console.log(doc + " Name" + doc.first_name + "fetchtweets success!" + doc.following[0])
            console.log(doc);

            console.log("Tweet res " + doc)
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });
            res.end(JSON.stringify(doc));

        }).catch((err) => {
            console.log("get fetchtweets Error! " + err)
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            //console.log(JSON.stringify(resultObject))
            res.end("get fetchtweets fail");
        })
});

// router.get("/fetchtweets", function (req, res) {
//     console.log("Inside fetchtweets profile");
//     var email = req.query.email
//     console.log(email)


//     Tweet.find({ text: email }).then((result1) => {
//         console.log("Tweet res " + result1)
//         res.writeHead(200, {
//             "Content-Type": "text/plain"
//         });
//         res.end(JSON.stringify(result1));
//     }).catch((err) => {
//         console.log(err)
//         res.writeHead(400, {
//             "Content-Type": "text/plain"
//         });
//         //console.log(JSON.stringify(resultObject))
//         res.end("get fetchtweets fail");
//     })
// })

module.exports = router